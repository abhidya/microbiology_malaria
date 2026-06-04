from server import app


def main():
    client = app.test_client()
    health = client.get("/health")
    assert health.status_code == 200
    visualization = client.get("/data/visualization")
    assert visualization.status_code == 200
    response = client.post(
        "/compute",
        data={
            "probs[]": ["100"],
            "size": "5",
            "functionLaw[]": ["powerLaw", "threshold"],
            "binsStart[]": ["1"],
            "binsEnd[]": ["10"],
            "location": "Lab demo",
            "species": "P. falciparum",
        },
    )
    assert response.status_code == 200
    assert b"powerLaw" in response.data


if __name__ == "__main__":
    main()
