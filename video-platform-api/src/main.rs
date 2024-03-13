use std::{fs, path::Path};

use actix_cors::Cors;
use actix_files::NamedFile;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Video {
    title: String,
    description: String,
    uploader: String,
    endpoint: Option<String>,
    filename: String,
    id: i32,
}

fn get_media() -> Option<Vec<Video>> {
    let media_path = Path::new("./media");

    if !media_path.exists() || !media_path.is_dir() {
        println!("No media folder found");
        return None;
    }

    let mut videos = Vec::new();

    for entry in fs::read_dir(media_path).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();

        if path.is_dir() {
            let info_path = path.join("info.json");
            if info_path.exists() {
                let info = fs::read_to_string(info_path).unwrap();
                let mut video: Video = serde_json::from_str(&info).unwrap();
                video.endpoint = Some(format!(
                    "http://localhost:8090/media/{}",
                    path.file_name().unwrap().to_str().unwrap()
                ));
                videos.push(video);
            }
        }
    }

    Some(videos)
}

async fn get_videos() -> impl Responder {
    println!("Getting videos");

    let videos = match get_media() {
        Some(v) => v,
        None => Vec::new(),
    };

    HttpResponse::Ok().json(videos)
}

async fn get_video_info(info: web::Path<String>) -> impl Responder {
    let id = info.parse::<i32>().unwrap();

    println!("Getting video info for id: {}", id);

    let videos = match get_media() {
        Some(v) => v,
        None => Vec::new(),
    };
    let video = videos.iter().find(|v| v.id == id);
    match video {
        Some(v) => HttpResponse::Ok().json(v),
        None => HttpResponse::NotFound().finish(),
    }
}

async fn get_file(info: web::Path<(String, String)>) -> Result<NamedFile, actix_web::Error> {
    let folder = &info.0;
    let filename = &info.1;
    let path = format!("./media/{}/{}", folder, filename);

    println!("Getting file: {}", path);

    Ok(NamedFile::open(path)?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin("http://localhost:5173")
            .allowed_methods(vec!["GET"])
            .allow_any_header()
            .max_age(3600);
        App::new()
            .wrap(cors)
            .route("/videos", web::get().to(get_videos))
            .route("/video/{id}", web::get().to(get_video_info))
            .route("/media/{folder}/{filename}", web::get().to(get_file))
    })
    .bind("127.0.0.1:8090")?
    .run()
    .await
}
