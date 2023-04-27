const getmatriculadata = async (id = "") => {
  let url = `https://retoolapi.dev/b8jz2L/matricula?Alumno=${id}`;
  if (id == "") {
    url = `https://retoolapi.dev/b8jz2L/matricula`;
  }
  const resp = await fetch(url);
  const data = await resp.json();
  return {
    data,
  };
};

export default getmatriculadata;
