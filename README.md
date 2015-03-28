# Ember-cli-sass-pods

Enjoy styling your pods with the sass style file in the pod directory.

## Installation

Install [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass).

```
npm install --save-dev ember-cli-sass
```

Install ember-cli-sass-pods

```
npm install --save-dev ember-cli-sass-pods
```

### The import file
You need to add the import file into your main app scss file.

If you use podModulePrefix (which is deprecated) your imports file will be
```
[podModulePrefix].scss
```
otherwize it will be:
```
imports.scss
```
Add import line into your main app scss file:

```
@import "app/styles/[podModulePrefix or imports.scss]";
```

## Usage

To generate style into your pod - just run:

```
ember g style [path] -p
```

## Example
Say you got contacts route and contact-box component. With [ember-cli-sass-pods](https://github.com/DudaDev/ember-cli-sass-pods) your file structure will be:

#####App structure
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
#####app/styles/[importFileName].scss
```
@import "app/contacts/style";
@import "app/components/contact-box/style";
```

Enjoy styling your pod! :)
