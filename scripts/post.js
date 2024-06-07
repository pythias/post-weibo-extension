// 找到微博发布框，将微博内容填入
// 需要等待页面加载完成
// 由于微博发布框是动态生成的，所以需要等待页面加载完成后再操作

const x = function () {
    const weiboInput = document.querySelector('textarea');
    if (weiboInput) {
        chrome.storage.local.get(["weiboFromExtension"], function (data) {
            const weibo = data.weiboFromExtension;
            console.log("Got weibo from extension", weibo);

            weiboInput.select();
            setTimeout(() => {
                weiboInput.value = "#2024高考作文# by ChatGPT-4o\n" + weibo.text;
                weiboInput.dispatchEvent(new Event('input', { bubbles: true }));
            }, 100);

            setTimeout(() => {
                // 找到发送按钮，点击发送
                const buttons = document.getElementsByClassName('woo-button-main');
                Array.from(buttons).forEach(button => {
                    const buttonContent = button.querySelector('span.woo-button-content');
                    if (buttonContent && buttonContent.innerText === '发送') {
                        console.log("Found send button, clicking...");
                        button.click();
                    }
                });
            }, 200);
        });
    }
}

setTimeout(x, 2000);

console.log("post.js loaded v1.0.1");
