# Ember-cli-sass-pods

Enjoy styling your pods with the sass style file in the pod directory.

## What is ember-cli-sass-pods?
Say you got contacts route and contact-box component.
##### Generate regular route and component:
```
ember g route contacts -p
ember g component contact-box -p
```
##### Then, use ember-cli-sass-pods power and generate style:
```
ember g style contacts -p
ember g style component/contact-box -p
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

##### Install [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass).

```
npm install --save-dev ember-cli-sass
```

##### Add app to include path in the config/environment.js

```
ENV.sassOptions = {
  includePaths: [
    'app'
  ]
}
```

##### Install ember-cli-sass-pods

```
npm install --save-dev ember-cli-sass-pods
```

##### The import file
You need to add the import file into your main app scss file.

If you use podModulePrefix (which is deprecated) your imports file would be:
```
[podModulePrefix].scss
```
otherwize it would be:
```
imports.scss
```
Add import line into your main app scss file:

```
@import "styles/[podModulePrefix or imports]";
```

## Usage

To generate style into your pod - just run:

```
ember g style [path] -p
```

Enjoy styling your pod! :)
