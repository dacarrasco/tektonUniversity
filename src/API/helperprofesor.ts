const getprofesordata = async (id = "") => {
  let url = `https://retoolapi.dev/dqtmRW/profesores?DNI=${id}`;
  if (id == "") {
    url = `https://retoolapi.dev/dqtmRW/profesores`;
  }
  const resp = await fetch(url);
  const data = await resp.json();
  return {
    data,
  };
};

export default getprofesordata;
