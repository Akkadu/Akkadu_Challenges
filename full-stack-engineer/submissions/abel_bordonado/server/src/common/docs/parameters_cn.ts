export const pagination = {
  content: {
    in: "query",
    name: "content",
    description: "要搜索的字符串",
    schema: { type: "string" },
    example: "Mike"
  },
  orderBy: {
    in: "query",
    description: "要排序的字段",
    name: "orderBy",
    schema: { type: "string" },
    example: "name",
    default: "createdAt"
  },
  orderDirection: {
    in: "query",
    description: "升序或降序",
    name: "orderDirection",
    schema: { type: "string" },
    example: "descent",
    enum: ["ascent", "descent"],
    default: "descent"
  },
  limit: {
    in: "query",
    name: "limit",
    description: "限制返回多少条记录。最大值：1000",
    schema: { type: "integer" },
    example: "20"
  },
  offset: {
    in: "query",
    name: "offset",
    description: "将跳过多少条记录",
    schema: { type: "integer" },
    example: "10",
    default: 0
  },
  from: {
    in: "query",
    name: "from",
    description: "开始日期。过滤创建日期在参数值之后的记录",
    schema: { type: "date" },
    example: "2019-05-02 12:03:245"
  },
  to: {
    in: "query",
    name: "to",
    description: "结束日期。过滤创建日期在参数值之前的记录",
    schema: { type: "date" },
    example: "2019-05-02 12:03:245"
  }
};
