import { useMutation } from '@apollo/client';
import { DELETE_EMBED_ELEMENT, EDIT_EMBED_ELEMENT } from '@edit/Elements/schema';
import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';
import useDebounce from '@hooks/useDebounce';
import useDidMountEffect from '@hooks/useDidMountEffect';
import useSectionLifeCycle from '@hooks/useSectionLifeCycle';
import FActionsBtn from '@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn';
import ChildInput from '@shared/Inputs/ChildInput';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Styles from '../Children.module.scss';

const Embed: React.FC = ({ id, onRemove }: any) => {

  const { section } = useSectionLifeCycle({
    sectionId: id,
    type: "embed",
    onFail: alert
  });

  const [cookies] = useCookies(["userAuthToken"]);
  const token = cookies.userAuthToken
  const [editEmbed] = useMutation(EDIT_EMBED_ELEMENT);
  const [deleteEmbed] = useMutation(DELETE_EMBED_ELEMENT);
  const [currentVals, setCurrentVals] = useState();
  const debounce = useDebounce(currentVals);

  useDidMountEffect(() => {
    if (!currentVals) return
    editEmbed({
      variables: {
        token,
        elementId: id,
        embed: currentVals
      }
    }).catch(err => alert(err.message))

  }, [debounce])

  function handleDelete() {
    deleteEmbed({
      variables: {
        token,
        elementId: id
      }
    }).then(() => onRemove(id))
      .catch(err => alert(err.message))
  }
  if (!section) return <>Loading</>
  const initialValues = {
    embed_code: section.embed_code,
    header: section.header,
    background_color: section.background_color

  }
  return (
    <div className={Styles.children}>
      <FormikContainer initialValues={initialValues}>
        {(formik) => {
          setCurrentVals(formik.values)
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();

              }}
            >
              <div className={Styles.children__input}>
                <FormikControl
                  control='input'
                  type='text'
                  name='header'
                  placeholder='Element Header'
                  required={true}
                  elementInput={true}
                  icon={true}
                />
              </div>
              <div className={Styles.children__input}>
                <FormikControl
                  control='textarea'
                  type='text'
                  name='embed_code'
                  placeholder='Embed Code'
                  required={true}
                  elementInput={true}
                  icon={true}
                />
              </div>

              <div className={Styles.children__btnContainer}>

                <FActionsBtn
                  title="Delete"
                  padding="7px 13px"
                  bgColor="red"
                  color="white"
                  actions={handleDelete}
                />
              </div>

              <div className={Styles.display__color}>
                <span className={Styles.title}>Element Display Color</span>

                <div className={Styles.inputWrapper}>
                  <FormikControl
                    control='input'
                    type='color'
                    name='background_color'
                    colorInput={true}
                  />
                  <FormikControl
                    control='input'
                    type='color'
                    name='font'
                    colorInput={true}
                  />
                </div>
              </div>
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default Embed;
