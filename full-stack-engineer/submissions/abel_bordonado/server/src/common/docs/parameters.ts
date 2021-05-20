export const pagination = {
  content: {
    in: "query",
    name: "content",
    description: "The string you want to search with.",
    schema: { type: "string" },
    example: "Mike"
  },
  orderBy: {
    in: "query",
    description: "The field you want to sort the results by.",
    name: "orderBy",
    schema: { type: "string" },
    example: "name",
    default: "createdAt"
  },
  orderDirection: {
    in: "query",
    description: "sort the results ascent or descent.",
    name: "orderDirection",
    schema: { type: "string" },
    example: "descent",
    enum: ["ascent", "descent"],
    default: "descent"
  },
  limit: {
    in: "query",
    name: "limit",
    description: "How many results will be taken. Maximum: 1000",
    schema: { type: "integer" },
    example: "20"
  },
  offset: {
    in: "query",
    name: "offset",
    description: "How many records will be skipped.",
    schema: { type: "integer" },
    example: "10",
    default: 0
  },
  from: {
    in: "query",
    name: "from",
    description: "Allow to filter elements createdAt after the parameter value",
    schema: { type: "date" },
    example: "2019-05-02 12:03:245"
  },
  to: {
    in: "query",
    name: "to",
    description: "Allow to filter elements createdAt before the parameter value",
    schema: { type: "date" },
    example: "2019-05-02 12:03:245"
  }
};
