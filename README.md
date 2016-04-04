# Ember-cli-sass-pods

Enjoy styling your pods with the sass style file in the pod directory.

## What is ember-cli-sass-pods?
Say you have a contacts route and contact-box component.
##### Generate regular route and component:
```
ember g route contacts -p
ember g component contact-box -p
```
##### Then, use ember-cli-sass-pods power and generate styles:
```
ember g style contacts -p
ember g style components/contact-box -p
```

##### Your awesome file structure would be:
```
app/

app/contacts
app/contacts/route.js
app/contacts/template.hbs
app/contacts/style.scss

app/components/
app/components/contact-box
app/components/contact-box/component.js
app/components/contact-box/template.hbs
app/components/contact-box/style.scss

app/styles/
app/styles/app.scss
app/styles/[importFileName].scss
```
##### app/styles/[importFileName].scss
```
@import "contacts/style";
@import "components/contact-box/style";
```

## Installation

##### Install ember-cli-sass-pods

* `ember install ember-cli-sass-pods`

It will automatically install [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass#ember-cli-sass) sass preprocess package.

##### The import file
You need to add the import file into your main app scss file.

If you use podModulePrefix your imports file would be:
```
[podModulePrefix].scss
```
otherwise it would be:
```
pods.scss
```
Add import line into your main app scss file:

```
@import "[podModulePrefix] or pods";
```

##### Watched folder
Add paths for watching in the 'ember.cli-build.js':
```
var app = new EmberApp(defaults, {
  sassOptions: {
    includePaths: ['app']
  }
});
```

## Usage

To generate styles into your pod - just run:

```
ember g style [path] -p
```

Enjoy styling your pod! :)
