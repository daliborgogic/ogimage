# ogimage

> Open Graph Image as a Service. A service that generates dynamic [Open Graph](https://ogp.me/) images that you can embed in your `<meta>` tags. For each keystroke, headless chromium is used to render an HTML page and take a screenshot of the result which gets cached.

<img src="https://daliborgogic.com/ogimage/tw-ogimage-sample.png" width="512">

```html
<head>
  <title>Hello World</title>
  <meta property="og:image" content="https://api.daliborgogic.com/Hello%20World.png" />
</head>
```

| Query     | Description |
|:----------|:----------------------------------------------------------------------|
|`md`       | `integer || boolean` Use Markdown. Options: `O || 1`. Deafult is `1`. |
| `theme`   | `string` Switch Theme. Options: `light || dark`. Default is `light`.  |
|`fontSize` | `string` Text font size. Default `96px`.                              |
|`images`   | `string` Add image.                                                   |
|`width`    | `integer` Image width.                                                |
|`height`   | `integer` height.                                                     |
|`slice`    | `integer` If api is in subfolder. (count string length).              |

### Usage

```bash
# Pull image
$ docker pull docker.pkg.github.com/daliborgogic/ogimage/ogimage:{TAG}

#  Run container
$ docker run -d --restart=always -p 3000:3000 docker.pkg.github.com/daliborgogic/ogimage/ogimage:{TAG}
```
