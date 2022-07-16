//@ts-check
const fs = require('fs');
const path = require('path');

class FileManager {
    constructor(){
        this.init();
    }

    init = async ()=>{
        return;
    }

    async getHtmlFromDirectoryByTemplate(template) {
        let filePath = path.join( __dirname, `../../../../public/emails/${template}.html` );

        if (fs.existsSync(filePath)) {
            let htmlContent = fs.readFileSync(filePath).toString();
            return { status: true, data: htmlContent }
        }
        return {status: true, error: 'could not file template on path'};
    }
}

module.exports = FileManager;