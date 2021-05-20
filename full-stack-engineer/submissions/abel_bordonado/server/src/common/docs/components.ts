export const errors = {
  500: {
    description: "Internal error and unable to process the request.",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            err: {
              type: "string",
              description: "Detailed error message describing the error message.",
              example: "Unable to connect to mongodb."
            }
          }
        }
      }
    }
  },
  401: {
    description: "You are not authorized or have enough permissions ",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            err: {
              type: "string",
              description: "Detailed error message describing the problem.",
              example: "User not authorized to edit this information"
            }
          }
        }
      }
    }
  },
  404: {
    description: "Required entities are not found, like channel, merchant or platform.",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            err: {
              type: "string",
              description: "Detailed error message describing the error.",
              example: "Channel not found."
            }
          }
        }
      }
    }
  },
  403: {
    description: "User not authorized to perform current operation",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            err: {
              type: "string",
              description: "Error message of the error",
              example: "User forbidden"
            }
          }
        }
      }
    }
  },
  422: {
    description: "Required fields are missing or invalid.",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            err: {
              type: "array",
              description: "Including the fields which are missing.",
              items: {
                type: "object",
                properties: {
                  param: {
                    type: "string",
                    description: "The name of the parameter",
                    example: "amount"
                  },
                  msg: {
                    type: "string",
                    description: "The error message of that parameter.",
                    example: "must be integer."
                  },
                  value: {
                    type: "string",
                    description: "The initial value of the parameter.",
                    example: 105.36
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  409: {
    description: "Operation can be perform because there is some data conflict.",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            err: {
              type: "string",
              description: "Detailed error message describing the problem.",
              example: "OrderNo already exists"
            }
          }
        }
      }
    }
  },
  412: {
    description:
      "Operation can be perform a pre condition is not satisfy as some data inconsistency.",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            err: {
              type: "string",
              description: "Detailed error message describing the problem.",
              example: "Balance Track is not synchronized"
            }
          }
        }
      }
    }
  },

  429: {
    description: "Too many request",
    content: {
      test: "Message error"
    }
  },
  424: {
    description: "Failed dependency. Module made a request to a third party and failed",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            err: {
              type: "string",
              description: "Detailed error message the third party problem.",
              example: "Customer Notify url not found"
            }
          }
        }
      }
    }
  }
};

export const ok = {
  type: "boolean",
  description: "Indicator if the request is successfully handled.",
  example: true
};
export const total = {
  type: "integer",
  example: 100,
  description: "description: How many records are found with current search"
};
