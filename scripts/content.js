console.log("Post Weibo Extension v1.0.4 loaded.");

const ServiceKimi = 'kimi';
const ServiceOpenAI = 'openai';

const PostButtonOpenAI = `
<span class="" data-state="closed">
    <button class="rounded-lg text-token-text-secondary hover:bg-token-main-surface-secondary">
        <span class="flex h-[30px] w-[30px] items-center justify-center">
            <svg t="1717741868300" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4233" width="24" height="24"><path d="M457.3 543c-68.1-17.7-145 16.2-174.6 76.2-30.1 61.2-1 129.1 67.8 151.3 71.2 23 155.2-12.2 184.4-78.3 28.7-64.6-7.2-131-77.6-149.2z m-52 156.2c-13.8 22.1-43.5 31.7-65.8 21.6-22-10-28.5-35.7-14.6-57.2 13.7-21.4 42.3-31 64.4-21.7 22.4 9.5 29.6 35 16 57.3z m45.5-58.5c-5 8.6-16.1 12.7-24.7 9.1-8.5-3.5-11.2-13.1-6.4-21.5 5-8.4 15.6-12.4 24.1-9.1 8.7 3.2 11.8 12.9 7 21.5zM785.3 443.5c15 4.8 31-3.4 35.9-18.3 11.8-36.6 4.4-78.4-23.2-109-27.6-30.6-68.4-42.3-106-34.3-15.4 3.3-25.2 18.4-21.9 33.8 3.3 15.3 18.4 25.2 33.8 21.8 18.4-3.9 38.3 1.8 51.9 16.7 13.5 15 17.2 35.4 11.3 53.3-4.9 15.1 3.2 31.1 18.2 36z" p-id="4234"></path><path d="M885.1 237.5c-56.7-62.9-140.4-86.9-217.7-70.5-17.9 3.8-29.3 21.4-25.4 39.3 3.8 17.9 21.4 29.3 39.3 25.5 55-11.7 114.4 5.4 154.8 50.1 40.3 44.7 51.2 105.7 34 159.1-5.6 17.4 3.9 36 21.3 41.7 17.4 5.6 36-3.9 41.6-21.2v-0.1c24.1-75.4 8.9-161.1-47.9-223.9zM729 499c-12.2-3.6-20.5-6.1-14.1-22.1 13.8-34.7 15.2-64.7 0.3-86-28-40.1-104.8-37.9-192.8-1.1 0 0-27.6 12.1-20.6-9.8 13.5-43.5 11.5-79.9-9.6-101-47.7-47.8-174.6 1.8-283.5 110.6C127.3 471.1 80 557.5 80 632.2 80 775.1 263.2 862 442.5 862c235 0 391.3-136.5 391.3-245 0-65.5-55.2-102.6-104.8-118zM443 810.8c-143 14.1-266.5-50.5-275.8-144.5-9.3-93.9 99.2-181.5 242.2-195.6 143-14.2 266.5 50.5 275.8 144.4C694.4 709 586 796.6 443 810.8z" p-id="4235" fill="currentColor"></path></svg>
        </span>
    </button>
</span>
`;

const PostButtonKimi = `
<span role="img" class="anticon icon___N21Rh MuiBox-root css-0">
    <svg t="1717741868300" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4233" width="1em" height="1em"><path d="M457.3 543c-68.1-17.7-145 16.2-174.6 76.2-30.1 61.2-1 129.1 67.8 151.3 71.2 23 155.2-12.2 184.4-78.3 28.7-64.6-7.2-131-77.6-149.2z m-52 156.2c-13.8 22.1-43.5 31.7-65.8 21.6-22-10-28.5-35.7-14.6-57.2 13.7-21.4 42.3-31 64.4-21.7 22.4 9.5 29.6 35 16 57.3z m45.5-58.5c-5 8.6-16.1 12.7-24.7 9.1-8.5-3.5-11.2-13.1-6.4-21.5 5-8.4 15.6-12.4 24.1-9.1 8.7 3.2 11.8 12.9 7 21.5zM785.3 443.5c15 4.8 31-3.4 35.9-18.3 11.8-36.6 4.4-78.4-23.2-109-27.6-30.6-68.4-42.3-106-34.3-15.4 3.3-25.2 18.4-21.9 33.8 3.3 15.3 18.4 25.2 33.8 21.8 18.4-3.9 38.3 1.8 51.9 16.7 13.5 15 17.2 35.4 11.3 53.3-4.9 15.1 3.2 31.1 18.2 36z" p-id="4234"></path><path d="M885.1 237.5c-56.7-62.9-140.4-86.9-217.7-70.5-17.9 3.8-29.3 21.4-25.4 39.3 3.8 17.9 21.4 29.3 39.3 25.5 55-11.7 114.4 5.4 154.8 50.1 40.3 44.7 51.2 105.7 34 159.1-5.6 17.4 3.9 36 21.3 41.7 17.4 5.6 36-3.9 41.6-21.2v-0.1c24.1-75.4 8.9-161.1-47.9-223.9zM729 499c-12.2-3.6-20.5-6.1-14.1-22.1 13.8-34.7 15.2-64.7 0.3-86-28-40.1-104.8-37.9-192.8-1.1 0 0-27.6 12.1-20.6-9.8 13.5-43.5 11.5-79.9-9.6-101-47.7-47.8-174.6 1.8-283.5 110.6C127.3 471.1 80 557.5 80 632.2 80 775.1 263.2 862 442.5 862c235 0 391.3-136.5 391.3-245 0-65.5-55.2-102.6-104.8-118zM443 810.8c-143 14.1-266.5-50.5-275.8-144.5-9.3-93.9 99.2-181.5 242.2-195.6 143-14.2 266.5 50.5 275.8 144.4C694.4 709 586 796.6 443 810.8z" p-id="4235" fill="currentColor"></path></svg>
</span>
`;

const processedConversations = new Set();

function createPostButtonOpenAI() {
    const weiboButton = document.createElement('button');
    weiboButton.innerHTML = PostButtonOpenAI;
    weiboButton.style.background = 'none';
    weiboButton.style.border = 'none';
    weiboButton.style.cursor = 'pointer';
    weiboButton.title = '发微博';
    weiboButton.onclick = function () {
        const copyButton = weiboButton.nextElementSibling.nextElementSibling.firstChild;
        const conversationContainer = copyButton.closest('div.w-full.text-token-text-primary');
        if (copyButton) {
            copyButton.click();
            afterPostButtonClicked(conversationContainer);
        }
    };

    return weiboButton
}

function createPostButtonKimi() {
    const weiboButton = document.createElement('button');
    weiboButton.className = "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium iconButton___3OzVF css-i0tiaf";
    weiboButton.setAttribute("data-testid", "msh-chat-segment-post");
    weiboButton.setAttribute("aria-label", "发微博");
    weiboButton.innerHTML = PostButtonKimi;
    weiboButton.onclick = function () {
        const copyButton = weiboButton.parentElement.querySelector("button[data-testid='msh-chat-segment-copy']");
        const conversationContainer = copyButton.closest('div.segment-container');
        if (copyButton) {
            copyButton.click();
            afterPostButtonClicked(conversationContainer);
        }
    };

    return weiboButton
}

function afterPostButtonClicked(conversationElement = null) {
    navigator.clipboard.readText().then(text => {
        switch (service) {
            case ServiceKimi:
                text = "#by Kimi#\n\n" + text;
                break;
            case ServiceOpenAI:
                text = "#by ChatGPT-4o#\n\n" + text;
                break;
            default:
                break;
        }

        const weibo = { text: text };
        const message = { type: "post-weibo", data: weibo };
        chrome.runtime.sendMessage(message, function (response) {
            console.log("Send post-weibo message", weibo)
        });
    });

    // html2canvas(conversationContainer, { useCORS: true }).then(canvas => {
    //     const image = canvas.toDataURL("image/png");
    //     console.log("image", image);
    // });
}

function createPostButton() {
    switch (service) {
        case ServiceKimi:
            return createPostButtonKimi();
        case ServiceOpenAI:
            return createPostButtonOpenAI();
        default:
            return document.createElement('button');
    }
}

function addWeiboButtons() {
    let selectors = '';
    let getButtonParent = function (element) { return null; }
    switch (service) {
        case ServiceKimi:
            selectors = 'button[data-testid="msh-chat-segment-copy"]';
            getButtonParent = function (element) {
                return element.parentElement
            }
            break;
        case ServiceOpenAI:
            selectors = ".icon-md-heavy";
            getButtonParent = function (element) {
                return element.closest('div.flex.items-center');
            }
            break;
        default:
            return false;
    }

    const toolElements = document.querySelectorAll(selectors);
    if (!toolElements) {
        return false;
    }

    Array.from(toolElements).forEach(toolElement => {
        const parentDiv = getButtonParent(toolElement);

        if (!parentDiv || processedConversations.has(parentDiv)) {
            return;
        }

        const weiboButton = createPostButton();
        parentDiv.insertBefore(weiboButton, parentDiv.firstChild);
        processedConversations.add(parentDiv);
    });

    return toolElements.length > 0;
}


function getPageService() {
    const currentPageUrl = window.location.href;

    if (currentPageUrl.includes('kimi.moonshot.cn')) {
        return ServiceKimi;
    }

    if (currentPageUrl.includes('chatgpt.com')) {
        return ServiceOpenAI;
    }

    return 'unknown';
}

let service = getPageService();
setInterval(addWeiboButtons, 2000);
