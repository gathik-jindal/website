14th May '26, 09:26pm (Incorrect)

Status: #Completed #ProperNotes

Tags: [[JavaScript]] [[Web Dev]] [[Programming languages]]

# Introduction to ES6 Modules

In ES6 syntax, to export a function or a variable we use the export keyword followed by the function or variable name.
[see more](https://www.codecademy.com/article/implementing-modules-using-es-6-syntax)

## ES6 Named Export Syntax

A module must be entirely contained within a file. So, let’s first consider where a new module may be placed within the file system.
Since it needs to be used by both of these projects, you may want to put it in a mutually accessible location.

The functions you wish to reuse can be exported using the named export syntax below:

```javascript
export { resourceToExportA, resourceToExportB, ...}
```

## ES6 Named Imports Syntax

The ES6 syntax for importing named resources from modules is similar to the export syntax:

```javascript
import { exportedResourceA, exportedResourceB } from '/path/to/module.js';
```

## Renaming Imports to Avoid Naming Collisions

ES6 includes syntax for renaming imported resources by adding in the keyword as. It looks like this:

```javascript
import { exportedResource as newlyNamedResource } from '/path/to/module'
```

## Default Exports and Imports

Every module also has the option to export a single value to represent the entire module called the default export. Often, though not always, the default export value is an object containing the entire set of functions and/or data values of a module.

The syntax for exporting a default object looks like this:

```javascript
const resources = {
  valueA,
  valueB
}
export { resources as default };
```

With this syntax, the object containing the module’s resources is first declared and then is exported on the next line. At first glance, it looks like the resources object is being exported as a named export. However, the clause as default renames the exported object to default, a reserved identifier that can only be given to a single exported value.

You may also see this shorthand syntax where the value follows export default is the default value to be exported:

```javascript
const resources = {
  valueA,
  valueB
}
export default resources;
```

## Importing Default Values

The syntax for importing default exports looks like this:

```javascript
import importedResources from 'module.js';
```

Notice that the curly braces are gone from the import statement. This syntax is actually shorthand for import { default as importedResources } from 'module.js and the imported default value may be given any name the programmer chooses.

It should be noted that if the default export is an object, the values inside cannot be extracted until after the object is imported, like so:

```javascript
// This will work...
import resources from 'module.js'
const { valueA, valueB } = resources;

// This will not work...
import { valueA, valueB } from 'module.js'
```
