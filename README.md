# Tiny Translator
Tiny translation library for Azure Translator Text service.

[![build status](https://secure.travis-ci.org/avoidwork/tiny-translator.svg)](http://travis-ci.org/avoidwork/tiny-translator)

### Configuration
#### key
Azure Translator Text API subscription key.

### Example
```javascript
const translator = require("tiny-translator")("SUBSCRIPTION_KEY");

async function translate (arg, to = "zh-Hans") {
  let result;
  
  try {
    result = await translator.translate({text: arg, to: to});
  } catch (e) {
    console.error(e.message);
  }

  return result.text;
}

(async function () {
  const translated = await translate("Hello, what is your name?");

  console.log(translated); // "你好, 你叫什么名字？"
}());
```

### API
### constructor (subscriptionKey)
Returns an instance of Tiny Translator.

#### languages (scope=translation,transliteration,dictionary)
Asynchronous function which returns a list of supported languages per scope.

#### reset ()
Resets the translator token to empty string.

#### translate ({text: '', to: 'lang'[, from: 'lang', textType: 'plain' || 'html', category: 'general', profanityAction: 'NoAction' || 'Marked' || 'Deleted', profanityMarker: 'Asterisk' || 'Tag', includeAlignment: true || false, includeSentenceLength: true || false, suggestedFrom: 'lang', fromScript: 'x', toScript: 'y', allowFallback: true || false]})
Asynchronous function which returns a translation. 

## License
Copyright (c) 2019 Jason Mulligan
Licensed under the BSD-3 license.
