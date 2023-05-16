const playlists = [
        {
            "nome": "rock alternativo",
            "id": 0,
            "fotoplaylist": "playlist/rockalternativo.jpg",
            "musicas": [
            {
              "nome": "given up",
              "artista": "linkin park",
              "album": "hybrid theory",
              "genero": "rock alternativo",
              "fotoalbum": "https://example.com/hybrid-theory.jpg",
              "audiofile": "/music/linkinpark_givenup.mp3"
            },
            {
              "nome": "chop suey!",
              "artista": "system of a down",
              "album": "toxicity",
              "genero": "rock alternativo",
              "fotoalbum": "https://example.com/toxicity.jpg",
              "audiofile": "/music/soad_chopsuey.mp3"
            },
            {
              "nome": "kryptonite",
              "artista": "3 doors down",
              "album": "the better life",
              "genero": "rock alternativo",
              "fotoalbum": "https://example.com/the-better-life.jpg",
              "audiofile": "https://example.com/3-doors-down-kryptonite.mp3"
            },
            {
              "nome": "everlong",
              "artista": "foo fighters",
              "album": "the colour and the shape",
              "genero": "rock alternativo",
              "fotoalbum": "https://example.com/the-colour-and-the-shape.jpg",
              "audiofile": "https://example.com/foo-fighters-everlong.mp3"
            },
            {
              "nome": "last resort",
              "artista": "papa roach",
              "album": "infest",
              "genero": "rock alternativo",
              "fotoalbum": "https://example.com/infest.jpg",
              "audiofile": "https://example.com/papa-roach-last-resort.mp3"
            }
          ]
        },
        {
          "nome": "rock internacional",
          "id": 1,
          "fotoplaylist": "/playlist/rockinternacional.jpg",
          "musicas": [
            {
              "nome": "sweet child o' mine",
              "artista": "guns n' roses",
              "album": "appetite for destruction",
              "genero": "rock internacional",
              "fotoalbum": "https://example.com/appetite-for-destruction.jpg",
              "audiofile": "https://example.com/guns-n-roses-sweet-child-o-mine.mp3"
            },
            {
              "nome": "livin' on a prayer",
              "artista": "bon jovi",
              "album": "slippery when wet",
              "genero": "rock internacional",
              "fotoalbum": "https://example.com/slippery-when-wet.jpg",
              "audiofile": "https://example.com/bon-jovi-livin-on-a-prayer.mp3"
            },
            {
              "nome": "stairway to heaven",
              "artista": "led zeppelin",
              "album": "led zeppelin iv",
              "genero": "rock internacional",
              "fotoalbum": "https://example.com/led-zeppelin-iv.jpg",
              "audiofile": "https://example.com/led-zeppelin-stairway-to-heaven.mp3"
            }
          ]
        },
        {
          "nome": "linkin park",
          "id": 2,
          "fotoplaylist": "/playlist/linkinpark.jpg",
          "musicas": [
            {
              "nome": "numb",
              "artista": "linkin park",
              "album": "meteora",
              "genero": "nu metal",
              "fotoalbum": "https://example.com/meteora.jpg",
              "audiofile": "https://example.com/linkin-park-numb.mp3"
            },
            {
              "nome": "papercut",
              "artista": "linkin park",
              "album": "hybrid theory",
              "genero": "rock alternativo",
              "fotoalbum": "https://example.com/hybrid-theory.jpg",
              "audiofile": "https://example.com/linkin-park-papercut.mp3"
            },
            {
              "nome": "given up",
              "artista": "linkin park",
              "album": "hybrid theory",
              "genero": "nu metal",
              "fotoalbum": "https://example.com/hybrid-theory.jpg",
              "audiofile": "https://example.com/linkin-park-crawling.mp3"
            },
            {
              "nome": "breaking the habit",
              "artista": "linkin park",
              "album": "meteora",
              "genero": "nu metal",
              "fotoalbum": "https://example.com/meteora.jpg",
              "audiofile": "https://example.com/linkin-park-breaking-the-habit.mp3"
            }
          ]
        },
        {
          "nome": "para malhar",
          "id": 3,
          "fotoplaylist": "/playlist/paramalhar.jpg",
          "musicas": [
            {
              "nome": "can't hold us",
              "artista": "macklemore & ryan lewis feat. ray dalton",
              "album": "the heist",
              "genero": "hip hop",
              "fotoalbum": "https://example.com/the-heist.jpg",
              "audiofile": "https://example.com/macklemore-ryan-lewis-cant-hold-us.mp3"
            },
            {
              "nome": "lose yourself",
              "artista": "eminem",
              "album": "8 mile soundtrack",
              "genero": "hip hop",
              "fotoalbum": "https://example.com/8-mile-soundtrack.jpg",
              "audiofile": "https://example.com/eminem-lose-yourself.mp3"
            },
            {
              "nome": "eye of the tiger",
              "artista": "survivor",
              "album": "eye of the tiger",
              "genero": "rock",
              "fotoalbum": "https://example.com/eye-of-the-tiger.jpg",
              "audiofile": "https://example.com/survivor-eye-of-the-tiger.mp3"
            }
          ]
        },
        {
          "nome": "bossa nova",
          "id": 4,
          "fotoplaylist": "/playlist/bossanova.jpg",
          "musicas": [
            {
              "nome": "garota de ipanema",
              "artista": "antônio carlos jobim",
              "album": "the composer of desafinado, plays",
              "genero": "bossa nova",
              "fotoalbum": "https://example.com/the-composer-of-desafinado-plays.jpg",
              "audiofile": "https://example.com/antonio-carlos-jobim-garota-de-ipanema.mp3"
            },
            {
              "nome": "desafinado",
              "artista": "tom jobim & newton mendonça",
              "album": "joão gilberto",
              "genero": "bossa nova",
              "fotoalbum": "https://example.com/joao-gilberto.jpg",
              "audiofile": "https://example.com/tom-jobim-newton-mendonca-desafinado.mp3"
            },
            {
              "nome": "chega de saudade",
              "artista": "joão gilberto",
              "album": "chega de saudade",
              "genero": "bossa nova",
              "fotoalbum": "https://example.com/chega-de-saudade.jpg",
              "audiofile": "https://example.com/joao-gilberto-chega-de-saudade.mp3"
            },
            {
              "nome": "wave",
              "artista": "antônio carlos jobim",
              "album": "wave",
              "genero": "bossa nova",
              "fotoalbum": "https://example.com/wave.jpg",
              "audiofile": "https://example.com/antonio-carlos-jobim-wave.mp3"
            }
        ]
    }
]

module.exports = playlists;
  