# reason

Browser kept throwing an error because of the api setting unsafe header user-agent so we removed that line of the code but thats why we had to modify it

```javascript
    /*
     Utils.js
    */
    const url = `${apiOptions.apiUrl}?${querystring.stringify(qs)}`;
    // const headers = Object.assign(
    // 	//{ 'User-Agent': 'WikiJS Bot v1.0' },
    // 	apiOptions.headers
    // );
    return fetch(url, apiOptions.headers, fetchOptions) // changed to apiOptions.headers as 2nd arg
        .then(res => {
            if (res.ok) {
                return res.json();
```
