import worker from "../src/index.js";

export const onRequest = async (context) => {
  return worker.fetch(context.request, context.env, context);
};
