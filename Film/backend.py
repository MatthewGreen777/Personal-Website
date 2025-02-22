import os
import requests
import random
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='front-end')

# Store API key in an environment variable for security
API_KEY = os.getenv("TMDB_API_KEY", "your_default_api_key_here")

HEADERS = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDE1YWRiZjAzM2JiZTBmZjVkM2E4YTk5M2Y3NTgwNSIsIm5iZiI6MTcyODA3MDM2NC4xNjE3NjIsInN1YiI6IjY3MDA0MGU4YzlhMTBkNDZlYTdjZTI2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ALw111-0iTaOBTnDpnOlAWVpX7KeXeYot0hfrX3lY_E"
}

# List of genre IDs from TMDB
GENRES = [
    28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402,
    9648, 10749, 878, 10770, 53, 10752, 37
]

# Serve static files for the front-end
@app.route('/')
@app.route('/<path:path>')
def serve_static_files(path='index.html'):
    return send_from_directory(app.static_folder, path)


# Genre-based movie search
@app.route("/genre-search", methods=["GET"])
def genre_search():
    genre = request.args.get('genre')
    page = request.args.get('currentPage', 1)

    if not genre:
        return jsonify({"error": "Genre ID is required"}), 400

    url = f"https://api.themoviedb.org/3/discover/movie"
    params = {
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US",
        "sort_by": "popularity.desc",
        "with_genres": genre,
        "page": page
    }
    response = requests.get(url, headers=HEADERS, params=params)
    return jsonify(response.json())


# Search movies by title
@app.route("/title-search", methods=["GET"])
def title_search():
    title = request.args.get('title')

    if not title:
        return jsonify({"error": "Title is required"}), 400

    url = f"https://api.themoviedb.org/3/search/movie"
    params = {
        "include_adult": "false",
        "original_language": "en",
        "query": title
    }
    response = requests.get(url, headers=HEADERS, params=params)
    data = response.json()

    # Filter out movies without a poster
    filtered_results = [movie for movie in data.get('results', []) if movie.get('poster_path')]
    return jsonify({'results': filtered_results})


# Get a random movie
@app.route("/random", methods=["GET"])
def random_movie():
    base_url = "https://api.themoviedb.org/3/discover/movie"

    while True:
        params = {
            "language": "en-US",
            "include_adult": "false",
            "vote_count.gte": 100,  # Only movies with 100+ votes
            "page": random.randint(1, 500)  # Random page for variety
        }

        response = requests.get(base_url, headers=HEADERS, params=params)

        if response.status_code == 200:
            movies_data = response.json().get("results", [])
            movies_with_posters = [movie for movie in movies_data if movie.get("poster_path")]

            if movies_with_posters:
                return jsonify(random.choice(movies_with_posters))
        else:
            return jsonify({"error": "Failed to retrieve movies"}), response.status_code


# Get movie details
@app.route("/movie-details", methods=["GET"])
def movie_details():
    movie_id = request.args.get('movie_id')

    if not movie_id:
        return jsonify({"error": "Movie ID is required"}), 400

    url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    params = {"language": "en-US"}
    response = requests.get(url, headers=HEADERS, params=params)
    return jsonify(response.json())


# Get movie recommendations
@app.route("/movie-recommendations", methods=["GET"])
def movie_recommendations():
    movie_id = request.args.get('movie_id')

    if not movie_id:
        return jsonify({"error": "Movie ID is required"}), 400

    url = f"https://api.themoviedb.org/3/movie/{movie_id}/recommendations"
    params = {"language": "en-US"}
    response = requests.get(url, headers=HEADERS, params=params)

    if response.status_code == 200:
        recommendations = [movie for movie in response.json().get("results", []) if movie.get("poster_path")]
        return jsonify({"results": recommendations})
    else:
        return jsonify({"error": "Failed to retrieve recommendations"}), response.status_code


# Get additional movie data
@app.route("/extra-data", methods=["GET"])
def extra_data():
    movie_id = request.args.get('movie_id')

    if not movie_id:
        return jsonify({"error": "Movie ID is required"}), 400

    movie_url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    providers_url = f"https://api.themoviedb.org/3/movie/{movie_id}/watch/providers"
    
    params = {
        "language": "en-US",
        "append_to_response": "release_dates,credits"
    }

    movie_resp = requests.get(movie_url, headers=HEADERS, params=params)
    providers_resp = requests.get(providers_url, headers=HEADERS)

    if movie_resp.status_code != 200:
        return jsonify({"error": "Failed to retrieve movie details"}), movie_resp.status_code

    extra_data = movie_resp.json()
    watch_providers = providers_resp.json()

    us_watch_link = watch_providers.get('results', {}).get('US', {}).get('link', "No Options Available")

    us_certifications = [
        entry for entry in extra_data.get('release_dates', {}).get('results', [])
        if entry.get('iso_3166_1') == 'US'
    ]

    cast = extra_data.get('credits', {}).get('cast', [])
    first_5_actors = cast[:5]

    crew = extra_data.get('credits', {}).get('crew', [])
    director = [member for member in crew if member.get('job') == 'Director']
    writer = [member for member in crew if member.get('job') == 'Writer']
    producer = [member for member in crew if member.get('job') == 'Producer']

    return jsonify({
        'us_certifications': us_certifications,
        'first_5_actors': first_5_actors,
        'director': director,
        'writer': writer,
        'producer': producer,
        'us_watch_link': us_watch_link
    })


# Run the app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
