const getcursodata = async (id = "") => {
  let url = `https://retoolapi.dev/ebCVPH/cursos?CodCurso=${id}`;
  if (id == "") {
    url = `https://retoolapi.dev/ebCVPH/cursos`;
  }
  const resp = await fetch(url);
  const data = await resp.json();
  return {
    data,
  };
};

export default getcursodata;
