"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = {
    401: {
        description: "访问被拒绝。您没有被授权或没有足够的权限",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        err: {
                            type: "string",
                            description: "描述权限问题的详细信息",
                            example: "User not authorized to edit this information"
                        }
                    }
                }
            }
        }
    },
    403: {
        description: "未授权用户执行当前操作",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        err: {
                            type: "string",
                            description: "描述错误的详细信息",
                            example: "User forbidden"
                        }
                    }
                }
            }
        }
    },
    404: {
        description: "无法找到指定的资源，如通道、商家或平台",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        err: {
                            type: "string",
                            description: "描述错误的详细信息",
                            example: "Channel not found."
                        }
                    }
                }
            }
        }
    },
    409: {
        description: "由于存在某些数据冲突，无法执行操作",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        err: {
                            type: "string",
                            description: "描述问题的详细错误信息",
                            example: "OrderNo already exists"
                        }
                    }
                }
            }
        }
    },
    412: {
        description: "请求头中指定的一些前提条件失败。执行操作的前提条件不满足，因为某些数据不一致",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        err: {
                            type: "string",
                            description: "描述问题的详细错误信息",
                            example: "Balance Track is not synchronized"
                        }
                    }
                }
            }
        }
    },
    422: {
        description: "必需的字段丢失或无效",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        err: {
                            type: "array",
                            description: "包含所有无效的字段",
                            items: {
                                type: "object",
                                properties: {
                                    param: {
                                        type: "string",
                                        description: "该参数的名称",
                                        example: "amount"
                                    },
                                    msg: {
                                        type: "string",
                                        description: "该参数的错误消息",
                                        example: "must be integer."
                                    },
                                    value: {
                                        type: "string",
                                        description: "该参数的初始值",
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
    424: {
        description: "依赖关系失败。模块向第三方发出请求，但失败",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        err: {
                            type: "string",
                            description: "第三方问题的详细错误信息",
                            example: "Customer Notify url not found"
                        }
                    }
                }
            }
        }
    },
    429: {
        description: "请求太频繁",
        content: {
            test: "错误信息"
        }
    },
    500: {
        description: "服务器错误。服务器由于遇到错误而不能完成该请求",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        err: {
                            type: "string",
                            description: "描述错误的详细信息",
                            example: "Unable to connect to mongodb"
                        }
                    }
                }
            }
        }
    }
};
exports.ok = {
    type: "boolean",
    description: "表示是否成功处理请求",
    example: true
};
exports.total = {
    type: "integer",
    description: "在当前搜索中找到多少条记录",
    example: 100
};
//# sourceMappingURL=components_cn.js.map