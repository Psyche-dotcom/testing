import useDebounce from "@hooks/useDebounce";
import React, { useEffect, useMemo, useState } from "react";
import { GetFonts } from "src/services/api/fonts/fonts";
import { Dropdown } from 'semantic-ui-react'
import CreatableSelect from 'react-select/creatable';
import { GetAudioFiles, getFileNameByUri } from "src/services/api/files/files";
import { useCookies } from "react-cookie";
import useDidMountEffect from "@hooks/useDidMountEffect";

const InputForm: React.FC<{
  type: any;
  id?: string;
  name: string;
  placeholder: string;
  customClass?: string;
}> = ({ type, id, name, placeholder, customClass }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      className={` ${customClass}`}
    />
  );
};

export const FontSelector = ({ setFont, placeholder }) => {
  const [raw, setRaw] = useState<string>("");
  const query = useDebounce(raw, 200);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (query !== "") {
      GetFonts(query)
        .then((data) => {
          const fonts = [];
          data.fonts.forEach((font) => {
            let words: string[] = font.familyName.split(' ');
            for (let i = 0; i < words.length; i++) {
              words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
            fonts.push({
              value: font.regularUri,
              label: words.join(" ")
            })
          });
          setData(fonts);
        })
        .catch((err) => alert(err.message))
    }
  }, [query]);

  return (
    <div>
      <CreatableSelect
        name="font_select"
        isClearable
        onChange={(data) => (data ? setFont(data) : null)}
        placeholder={placeholder}
        onInputChange={setRaw}
        options={data}
      />
    </div>
  )
};


export const AudioSelector = ({ setAudio, placeholder, value }) => {
  const [raw, setRaw] = useState('');
  const [data, setData] = useState([]);
  const [cookies] = useCookies(['userAuthToken'])
  const query = useDebounce(raw, 200);
  const [current, setCurrent] = useState<{ label: string, value: string }>();

  useEffect(() => {
    (async () => {
      const existingFile = data.find(file => file.uri === value);
      if (existingFile) {
        setCurrent({ ...existingFile });
      }
      const { name: label } = await getFileNameByUri(value);
      setCurrent({ label, value })
    })()
  }, [value])

  useEffect(() => {
    GetAudioFiles(query, cookies.userAuthToken)
      .then(data => {
        if (data.files) {
          setData(data.files.map(file => ({ label: file.displayName, value: file.uri })))
        }
      })
  }, [query])

  return (
    <div style={{ color: 'black' }}>
      {current &&
        <CreatableSelect
          name="audio_select"
          isClearable
          onChange={(data) => (data ? setAudio(data) : null)}
          placeholder={placeholder}
          onInputChange={setRaw}
          options={data}
          value={current}
        />
      }
    </div>

  )
}


export default InputForm;
