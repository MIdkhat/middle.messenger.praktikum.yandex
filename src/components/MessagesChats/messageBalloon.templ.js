export const lmbTemplate = `
<div class="message-right-container content-reply">
    <img class="avatar {{#if hideAvatar}}hidden{{else}}''{{/if}}" src="{{avatar}}" alt="avatar" title="{{author}}">
    <div class="message-right-content">
        <p class="author">{{author}}</p>
        <p class="message-text">{{message}}</p>
        <p class="date">{{date}}</p>
    </div>
</div>
`
export const rmbTemplate = `
<div class="messages message-right-container content-you">
    <div class="message-right-content">
        <p class="align-right author">{{ author }}</p>
        <p class="message-text">{{ message }}</p>
        <p class="align-right date">{{ date }}</p>
    </div>
    <img class="avatar {{#if hideAvatar}}hidden{{else}}''{{/if}}" src="{{avatar}}" alt="avatar" title="{{author}}">
</div>
`