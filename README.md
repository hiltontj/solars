<div align="center">
<img src="public/solars.svg" width="128px"/>
<h1>solars</h1>
<p align="center"><i>Visualize the planets of our solar system</i></p>

[![GitHub release](https://img.shields.io/github/v/release/hiltontj/solars)](https://github.com/hiltontj/solars/releases)

</div>

## Overview

`solars` is a learning tool for exploring our solar system. Originally developed as a quick way to visualize planetary alignment on a given date, `solars` is also a foray into application design and the world of application development using [Tauri][tauri-app].

[tauri-app]: https://tauri.app/

## Preview

Enter a year, month, and day to see the relative alignment of the planets, or select one of the inputs and scroll up or down to fast-forward or rewind, respectively. Click **Today** to jump to today's date:

<div>
<img src="public/solars_main.gif" />
</div>

Some basic options allow you to customize the view:

<div>
<img src="public/solars_options.gif" />
</div>

## Build & Development

Clone this repository to your local machine. Since `solars` is a Tauri app, you may read the guides for [Developing Tauri apps][tauri-develop] and for [Building Tauri apps][tauri-build] on the official website.

You will need one of Tauri's CLI utilities installed, e.g., `tauri-cli`:

```
cargo install tauri-cli
```

You can then build the application bundle for your local operating system:

```
cargo tauri build
```

Or, launch the development server:

```
cargo tauri dev
```

[tauri-build]: https://tauri.app/v1/guides/building/
[tauri-develop]: https://tauri.app/v1/guides/development/development-cycle

## License

This project is licensed under the MIT License.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in `solars` by you, shall be licensed as MIT, without any
additional terms or conditions.
