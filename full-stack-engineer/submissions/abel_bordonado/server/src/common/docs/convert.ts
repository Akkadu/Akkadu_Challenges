import mongoose from "mongoose";

"use strict";

const adjustType = (type: string) => {
  let newType;
  if (type === "ObjectId" || type === "ObjectID") {
    newType = "object";
  } else {
    newType = type;
  }
  return newType.toLowerCase();
};

function convertModel<T extends mongoose.Document>(Model: mongoose.Model<T>) {
  const obj = {
    title: Model.modelName,
    properties: {},
    required: [] as any[]
  };

  const pathsToSchema = (parent: { [x: string]: any }, paths: { [x: string]: any }) => {
    Object.keys(paths)
      .map(x => paths[x])
      .forEach(mongooseProp => {
        parent[mongooseProp.path] = {};
        const modelProp = parent[mongooseProp.path];

        if (mongooseProp.instance === "Array") {
          modelProp.type = "array";
          modelProp.items = {
            properties: {}
          };
          if (mongooseProp.schema) {
            pathsToSchema(modelProp.items.properties, mongooseProp.schema.paths);
          } else {
            modelProp.items = {
              type: "object"
            };
          }
        } else if (mongooseProp.instance === "Embedded") {
          modelProp.properties = {};
          modelProp.type = "object";
          pathsToSchema(modelProp.properties, mongooseProp.schema.paths);
        } else if (mongooseProp.instance === "ObjectID") {
          modelProp.type = "string";
          modelProp.required = mongooseProp.isRequired || false;
        } else if (mongooseProp.instance === "Date") {
          modelProp.type = "string";
          modelProp.format = "date-time";
          modelProp.required = mongooseProp.isRequired || false;
        } else {
          modelProp.type = adjustType(mongooseProp.instance);
          modelProp.required = mongooseProp.isRequired || false;
        }
        // custom mongoose options
        if (mongooseProp.options) {
          if (mongooseProp.options.description) {
            modelProp.description = mongooseProp.options.description;
          }
          if (mongooseProp.options.example) {
            modelProp.example = mongooseProp.options.example;
          }
        }
        if (mongooseProp.enumValues && mongooseProp.enumValues.length) {
          modelProp.enum = mongooseProp.enumValues;
        }
        if (modelProp.required) {
          obj.required.push(mongooseProp.path);
        }
        delete modelProp.required;
      });
  };

  pathsToSchema(obj.properties, (Model.schema as any).paths);

  return obj;
}

convertModel.adjustType = adjustType;

export const convert = convertModel;
