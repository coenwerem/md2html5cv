# md2html5cv
Utility for automatically generating a HTML5 CV from Markdown. To change the format of the CV, edit the `cv_template.html` file. 
The CV template uses [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) for styling but you are welcome to use your own custom CSS!

## `npm` Dependencies
`md2html5cv` needs the following dependencies to work reliably:
- `marked` (install using `npm install marked`)
- `path` (install using `npm install path`)

Note: You may need to include the `--save` flag to the install commands above if NodeJS returns a `npm cannot find module` error. 

## Generating your Markdown CV from pdf
Except you already have your CV in `.md` format, rewriting your CV from scratch in Markdown can be quite tedious and, frankly, is an unnecessary chore. Thus, to streamline the markdown-to-html5 conversion process, what you want to do is convert your current CV in `.pdf` format (surely you must have a pdf copy handy) to Markdown. You may employ any PDF-to-Markdown conversion service of your choosing. The online service, [pdf2md](https://pdf2md.morethan.io/), and [`marker`](https://github.com/VikParuchuri/marker) are free and yield reasonably-accurate results. You will still have to do some post-conversion edits, unfortunately. Also note that `marker` uses several deep learning models for a more faithful conversion and thus, might be a bit heavier, but YMMV. You may then use `md2html5cv` to convert your markdown CV to HTML5 format and apply custom styling to your liking. It is true that there are services (such as [`pdf2htmlEX`](https://github.com/pdf2htmlEX/) and [`pdf2html`](https://github.com/shebinleo/pdf2html#readme)) that promise to render HTML5 from pdf directly and quite reliably. However, they are either quite complex to get up and running for the uninitiated, have limited or nonexistent cross-platform support ([`pdf2htmlEX` builds will fail on macOS](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Building), for instance), or have since been [archived](https://github.com/coolwanglu/pdf2htmlEX).

## Usage
- Install [NodeJS](https://nodejs.org/en/download/package-manager) for your platform.
- Install the required `npm` dependencies (see section above).
- Clone this repo to a directory of your choosing with `git clone https://github.com/coenwerem/md2html5cv.git`
- Generate your markdown CV (see section above) and copy it to the `md2html5cv` repo's parent directory.
- Run `cd md2html5cv` to enter the root directory of the repo.
- Run `node md2html5cv.js`

A file named `generated-cv.html` should now be in the repo's parent directory with your HTML5 CV. Copy this to your website for further styling. For a more straightforward generation and styling workflow, you may just want to integrate `md2html5cv` directly in your website's repo (if it's hosted via a public static-site-from-repo service, like [GitHub Pages](https://pages.github.com/)).

## Issues
Let me know if there are issues with using `md2html5cv`. If you find the utility helpful, I'd appreciate it if you could kindly star the repo. :)
