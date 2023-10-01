### Debounce when using on change

````js
  const debounce = (onChange) => {
    // hold the request after 2 se
    let timer;
      return (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
        onChange(e.target.value);
      }, 300);
    };
};```

```js
  onChange={
    debounce((value) => {
      onSetParams("search", [value]);
    })
  }
````

### Debounce when using submit form

```js
const debounce = (onChange) => {
  // hold the request after 2 se
  let timer;
  return (e) => {
    const form = e.currentTarget.form;
    clearTimeOut(timeout);
    timer = setTimeout(() => {
      onChange(e.target.value);
    }, 300);
  };
};
```

```js
  onChange={
    debounce((value) => {
      submit(value); // from useSubmit
    })
  }
```
