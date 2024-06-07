
const gotWeiboData = function (result) {
    console.log("Got weibo from extension", result);

    const weiboInput = document.querySelector('textarea');
    if (!weiboInput) {
        return;
    }
    
    const weiboFromExtension = result.weiboFromExtension;
    weiboInput.select();
    setTimeout(() => {
        const postContent = "#2024高考作文# by ChatGPT-4o\n\n" + weiboFromExtension.text;
        const lines = postContent.split("\n");
        const formattedLines = lines.map(line => {
            // 其他格式先不管
            line = line.replaceAll(/^#+\s/g, "");
            return line;
        });
        weiboInput.value = formattedLines.join("\n");
        weiboInput.dispatchEvent(new Event('input', { bubbles: true }));
    }, 100);

    setTimeout(() => {
        const buttons = document.getElementsByClassName('woo-button-main');
        Array.from(buttons).forEach(button => {
            const buttonContent = button.querySelector('span.woo-button-content');
            if (buttonContent && buttonContent.innerText === '发送') {
                button.click();
            }
        });
    }, 200);
};

const execute = function () {
    chrome.storage.local.get(['weiboFromExtension'], gotWeiboData);
}

setTimeout(execute, 1000);

console.log("post.js loaded v1.0.2");
