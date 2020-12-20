const readAsJSON = async (body: Deno.Reader) => {
  const allBody = await Deno.readAll(body);
  const textBody = new TextDecoder().decode(allBody);
  return JSON.parse(textBody);
};

export default readAsJSON;
