# md2html5cv
Utility for automatically generating a HTML5 CV from Markdown. To change the CV's format, carefully edit the CV template (`cv_template.html`) file. 
The CV template uses [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) for styling components, but you are welcome to use your own custom CSS!

## `npm` Dependencies
`md2html5cv` needs the following dependencies to work reliably:
- `marked` (install using `npm install marked`)
- `path` (install using `npm install path`)

Note: You may need to include the `--save` flag in the install commands above (after `install` and before the module name) if NodeJS returns an `npm cannot find module` error. 

## Generating your Markdown CV from PDF
Except you already have your CV in `.md` format, rewriting your CV from scratch in Markdown can be quite tedious and, frankly, is an unnecessary chore. Thus, to streamline the markdown-to-html5 conversion process, what you want to do is to convert your current CV in `.pdf` format (surely you must have a PDF copy handy) to Markdown. You may employ any PDF-to-Markdown conversion service of your choosing. The following tools are free and yield reasonably-accurate results. You will still have to do some post-conversion edits, unfortunately.
- The online service, [pdf2md](https://pdf2md.morethan.io/).
- [`marker`](https://github.com/VikParuchuri/marker). **Note**: `marker` uses several deep learning models for a more faithful conversion and thus, might be a bit heavier, but YMMV.
  
Once you have your Markdown CV ready, you may then use `md2html5cv` to convert it to HTML5 format (see usage instructions below) and apply custom styling to your liking. 

## Usage
- Install [NodeJS](https://nodejs.org/en/download/package-manager) for your platform.
- Install the required `npm` dependencies (see section above).
- Clone this repo to a directory of your choosing with `git clone https://github.com/coenwerem/md2html5cv.git`
- Generate your markdown CV (see section above) and copy it to the `md2html5cv` repo parent directory.
- Run `cd md2html5cv` to enter the root directory of the repo.
- [**Optional**]: Edit the `cv-template.html` file to use your own CSS. **Warning**: Do not change the body of the html template unless you know what you are doing, as changing the template's body carelessly can cause the entire conversion process to fail altogether.
- Run `node md2html5cv.js`

A file named `generated-cv.html` should now be in the repo's parent directory with your HTML5 CV. Copy this to your website for further styling. For a more straightforward generation and styling workflow, you may just want to integrate `md2html5cv` directly in your website's repo (if it's hosted via a public static-site-from-repo service, like [GitHub Pages](https://pages.github.com/)).

## Alternatives
Should you find the above process a bit too much or don't quite get the results you desire (open an issue if it's a problem with the tool and I will try to get to it as soon as I can), you may try the below alternatives:
- [`pdf2htmlEX`](https://github.com/pdf2htmlEX/) (fork of the original but discontinued [pdf2htmlEX](https://github.com/coolwanglu/pdf2htmlEX) repo)
- [`pdf2html`](https://github.com/shebinleo/pdf2html#readme)

However, note that while these services promise to render HTML5 from PDF directly and quite reliably, they may be a bit sophisticated to get up and running for the uninitiated or may have limited or nonexistent cross-platform support ([`pdf2htmlEX` builds will fail on macOS](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Building), for instance).

## Issues
Let me know if there are issues with using `md2html5cv`. Also, if you find the utility helpful, I'd appreciate it if you could kindly star the repo. :)
