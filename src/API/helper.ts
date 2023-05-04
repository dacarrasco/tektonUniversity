const getdata = async (id = "") => {
  let url = `https://retoolapi.dev/k7LL5B/Alumnos?DNI=${id}`;
  if (id == "") {
    url = `https://retoolapi.dev/k7LL5B/Alumnos`;
  }
  const resp = await fetch(url);
  const data = await resp.json();
  return {
    data,
  };
};

export default getdata;
