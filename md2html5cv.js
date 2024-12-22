const fs = require('fs');
const { marked, Renderer } = require('marked');
const path = require('path');

// Configure marked options
marked.use({
    mangle: false,
    headerIds: false
});

function formatContent(content) {
    return content
        .replace(/\*\*(.*?)\*\*/g, '<span class="font-weight-bold">$1</span>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

const renderer = new Renderer();
// Custom strong renderer
renderer.strong = function(text) {
    return `<span style="font-weight: bold;">${text.text.toString()}</span>`;
};

renderer.listitem = function(text) {
    const datePatterns = {
        yearToDate: /^(\d{4})-Date(.*)/,
        yearToPresent: /^(\d{4})-Present(.*)/,
        singleYear: /^(\d{4})(.*)/,
        monthYearRange: /^(\d{1,2})\/(\d{4})-(\d{1,2})\/(\d{4})\s*(.*)/,
        yearRangeMonth: /^(\d{1,2})-(\d{1,2})\/(\d{4})\s*(.*)/,
        yearRangeMonthTwo: /^(\d{1,2})-(\d{1,2})\/(\d{4})\s*(.*)/,
        yearToYear: /^(\d{4})-(\d{4})(.*)/, 
        monthYearToDate: /^(\d{1,2})\/(\d{4})-Date(.*)/,
        monthYearToPresent: /^(\d{1,2})\/(\d{4})-Present(.*)/,
        seasonYear: /^(Fall|Spring|Summer)\s*(\d{4}):/,  
        skillsStr: /^([A-Za-z0-9\s]+):\s*(.*)/,
        monthRangeYear: /^(\d{1,2})-(\d{1,2})\/(\d{4})\s+([^\n]+)(?:\n(.*))?/,
        monthYearToMonthYear: /^(\d{1,2})\/(\d{4})-(\d{1,2})\/(\d{4})\s*(.*)/,
        shortMonthRange: /^(\d{1,2})-(\d{1,2})\/(\d{4})\s*(.*)/,
        seasonYearRange: /^\((Fall|Spring|Summer)\s*(\d{4}),\s*(Fall|Spring|Summer)\s*(\d{4})\)\s*\*\*(.*?)\*\*:\s*(.*)/
    };

    const str = text.text.toString();

    const isHeading = str.startsWith('####') || str.startsWith('###') || str.startsWith('##') || str.startsWith('#');
    let processedStr = str;

    if (isHeading) {
        processedStr = str.replace(/^#+\s*/, '');
    }
    
    if (datePatterns.monthYearToMonthYear.test(processedStr)) {
        const [_, startMonth, startYear, endMonth, endYear, content] = processedStr.match(datePatterns.monthYearToMonthYear);
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${startMonth}/${startYear}-${endMonth}/${endYear}</div>
            <div class="col-9">${content}</div>
        </li>`;
    }

    if (datePatterns.shortMonthRange.test(processedStr)) {
        const [_, startMonth, endMonth, year, content] = processedStr.match(datePatterns.shortMonthRange);
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${startMonth}-${endMonth}/${year}</div>
            <div class="col-9">${content}</div>
        </li>`;
    }

    if (datePatterns.seasonYearRange.test(processedStr)) {
        const [_, startSeason, startYear, endSeason, endYear, title, description] = processedStr.match(datePatterns.seasonYearRange);
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${startSeason} ${startYear}, ${endSeason} ${endYear}</div>
            <div class="col-9">
                <div class="font-weight-bold">${title}</div>
                <div>${formatContent(description)}</div>
            </div>
        </li>`;
    }

    if (datePatterns.yearToYear.test(str)) {
        const [_, yearFrom, yearTo, content] = str.match(datePatterns.yearToYear);
        const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<span class="font-weight-bold">$1</span>');
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${yearFrom}-${yearTo}</div>
            <div class="col-9">${formatContent(formattedContent)}</div>
        </li>`;
    }
    
    if (datePatterns.seasonYear.test(processedStr)) {
        const [_, season, year] = processedStr.match(datePatterns.seasonYear);
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${season} ${year.trim()}</div>
            <div class="col-9">${processedStr.replace(/^(Fall|Spring|Summer)\s*\d{4}/, '').trim().replace(':','')}</div>
        </li>`;
    }

    if (datePatterns.yearRangeMonth.test(processedStr)) {
        const [_, startMonth, endMonth, year, content] = processedStr.match(datePatterns.yearRangeMonth);
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${startMonth}-${endMonth}/${year}</div>
            <div class="col-9">${content}</div>
        </li>`;
    }

    if (datePatterns.monthYearRange.test(processedStr)) {
        const [_, startMonth, startYear, endMonth, endYear, content] = processedStr.match(datePatterns.monthYearRange);
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${startMonth}/${startYear}-${endMonth}/${endYear}</div>
            <div class="col-9">${content}</div>
        </li>`;
    }

    if (datePatterns.yearRangeMonthTwo.test(processedStr)) {
        const [_, startMonth, startYear, endMonth, endYear, content] = processedStr.match(datePatterns.yearRangeMonthTwo);
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${startMonth}/${startYear}-${endMonth}/${endYear}</div>
            <div class="col-9">${content}</div>
        </li>`;
    }

    if (datePatterns.monthYearToDate.test(processedStr)) {
        const [_, month, year, content] = processedStr.match(datePatterns.monthYearToDate);
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${month} ${year}-Date</div>
            <div class="col-9"><em>${content}</em></div>
        </li>`;
    }

    if (datePatterns.monthYearToPresent.test(processedStr)) {
        const [_, month, year, content] = processedStr.match(datePatterns.monthYearToPresent);
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${month} ${year}-Present</div>
            <div class="col-9"><em>${content}</em></div>
        </li>`;
    }

    if (datePatterns.yearToDate.test(str)) {
        const [_, year, content] = str.match(datePatterns.yearToDate);
        const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<span class="font-weight-bold">$1</span>');
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${year}-Date</div>
            <div class="col-9">${formatContent(formattedContent)}</div>
        </li>`;
    }

    if (datePatterns.yearToPresent.test(str)) {
        const [_, year, content] = str.match(datePatterns.yearToPresent);
        const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<span class="font-weight-bold">$1</span>');
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${year}-Present</div>
            <div class="col-9">${formatContent(formattedContent)}</div>
        </li>`;
    }
    
    if (datePatterns.singleYear.test(str)) {
        const [_, year, content] = str.match(datePatterns.singleYear);
        const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<span class="font-weight-bold">$1</span>');
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${year}</div>
            <div class="col-9">${formatContent(formattedContent)}</div>
        </li>`;
    }

    if (datePatterns.skillsStr.test(str)) {
        const [_, skillcat, skills] = str.match(datePatterns.skillsStr);
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${skillcat}</div>
            <div class="col-9">${skills}</div>
        </li>`;
    }

    if (datePatterns.monthRangeYear.test(processedStr)) {
        const [_, startMonth, endMonth, year, role, description] = processedStr.match(datePatterns.monthRangeYear);
        return `<li class="row mb-2">
            <div class="col-3 font-weight-bold">${startMonth}-${endMonth}/${year}</div>
            <div class="col-9">
                <div>${role}</div>
                ${description ? `<div>${formatContent(description)}</div>` : ''}
            </div>
        </li>`;
    }
    
    return `<li class="row mb-2">
        <div class="col-12">${str}</div>
    </li>`;
};

renderer.heading = function (text) {
    if (!text.text) {
        console.error('Renderer.heading received undefined value.');
        return '';
    }
    const cleanText = text.text.toString();
    let headingHtml;
    switch (text.depth) {
        case 1:
            headingHtml = `<h2 class="display-4 font-weight-bold mb-4">${cleanText}</h2>`;
            break;
        case 2:
            headingHtml = `<h3 class="h3 mb-3">${cleanText}</h3>`;
            break;
        case 3:
            headingHtml = `<h4 class="h4 mb-2">${cleanText}</h4>`;
            break;
        case 4:
            headingHtml = `<h5 class="h5 mb-2">${cleanText}</h5>`;
            break;
        case 5:
            headingHtml = `<h6 class="h6 mb-2">${cleanText}</h6>`;
            break;
        default:
            headingHtml = `<h${text.depth - 1} class="mb-2">${cleanText}</h${text.depth - 1}>`;
            break;
    }
    return `${headingHtml}<hr>`;
};

try {
    const cvDir = path.join(__dirname, 'md');
    const cvFiles = fs.readdirSync(cvDir).filter(file => file.endsWith('.md'));

    if (cvFiles.length === 0) {
        throw new Error('No markdown files found in the md directory.');
    }

    const cvPath = path.join(cvDir, cvFiles[0]); // Use the first markdown file found
    const templatePath = path.join(__dirname, 'template/cv_template.html');
    const outputPath = path.join(__dirname, 'output/generated_cv.html');

    // Read the template and markdown files
    const template = fs.readFileSync(templatePath, 'utf-8');
    const cvMarkdown = fs.readFileSync(cvPath, 'utf-8');

    // Ensure the placeholder exists in the template
    if (!template.includes('{{CV_CONTENT}}')) {
        throw new Error('Placeholder {{CV_CONTENT}} not found in the template.');
    }

    // Convert markdown to HTML
    const cvContent = marked(cvMarkdown, { renderer });

    // Replace the placeholder only
    const finalHtml = template.replace(/{{CV_CONTENT}}/g, cvContent);

    // Write the modified content to the output file
    fs.writeFileSync(outputPath, finalHtml);
    console.log('CV HTML generated successfully!');
} catch (error) {
    console.error('Error during CV generation:', error.message);
}