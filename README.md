# Custom utils for the Razer Chroma Rest SDK

Hello Everyone, this is part of a port of the razer chroma rest sdk, while
razer offers the official javascript implementation of the SDK, it is quite of an All in one solution, you could easily use it there's nothing wrong on that. However I wanted to practice a little bit and also have some typescript support as well.


# Usage
Please refer to the `src/tests` directory to see how it is used, but for short
```ts
                      // true is for development
const keyboard = new KeyboardHelper(true, {
      author: {
        name: "Chroma Tester",
        contact: "Tester"
      },
      title: "Chroma SDK Test Runner",
      device_supported: ["keyboard"],
      category: "application",
      description: "Test App"
    });

async function main() {
  // either init at the beggining of the app or inside the function
  // just take in mind that this calls the chroma api each 5s
  await keyboard.init(); 
  let id;
  const autoapply = false; // or true depending on you
  
  if(autoapply) {
    id = await keyboardInstance
        // auto apply effect
        .stopAnimation(true);
    // do more stuff...
  } else {
    id = await keyboardInstance.stopAnimation();
    // do more stuff...
  
    // apply the effect
    await keyboard.applyEffect(id);
    
  }
  
  // do more stuff...
  
  // you need to delete the effects to release resources
  await keyboard.deleteEffect(id); 
  
  // remove the connection with the server and remove polling to the endpoint
  keyboard.unload();
}

main();
```


# Dist
This package produces UMD compiled javascript files, it is not a bundle, and it is not meant to be consumed directly,
you should be using this with a bundler, say for example webpack

# Build
```
npm install
npm run build
```
this will create a Dist directory with the UMD compiled javascript files

# Development
```
npm install
npm run test:watch
```
if these two run well, you are ready to add/modify whatever you need
alsso if you are using vscode you can debug the tests since they are run with
`--inspect` by default


This code does not use razer specific product inside the code I based the code to reflect the Rest API that is documented on the [Razer Rest SDK Docs](https://assets.razerzone.com/dev_portal/REST/html/index.html)

# Links
- [Razer Developer Portal](https://developer.razer.com)
- [Razer Developer Portal Downloads](https://developer.razer.com/works-with-chroma/download)
- [Razer Official HTML5 SDK](https://github.com/razerofficial/HTML5ChromaSDK)
