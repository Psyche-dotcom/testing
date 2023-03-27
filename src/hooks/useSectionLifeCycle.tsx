import { useEffect } from "react";
import { RootState } from "@redux/store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  cacheClearSection,
  cacheSectionContent,
} from "@redux/createSlice/editorSlice";
import { DocumentNode, useLazyQuery } from "@apollo/client";
import {
  GET_EMBED,
  GET_GALLERY_SECTION,
  GET_MEMBERS_SECTION,
  GET_SIMPLE_LINKS_SECTION,
  GET_SOCIALS_SECTION,
} from "@graphql/query";
import { useCookies } from "react-cookie";

type SectionTypes = "simple_links" | "embed" | "members" | "gallery" | "socials";

interface SectionLifeCycleProps {
  sectionId: string;
  type: SectionTypes;
  onFail(v: any): void;
}

const getQuery = (type: SectionTypes): DocumentNode => {
  switch (type) {
    case "simple_links":
      return GET_SIMPLE_LINKS_SECTION;
    case "embed":
      return GET_EMBED;
    case "gallery":
      return GET_GALLERY_SECTION;
    case "members":
      return GET_MEMBERS_SECTION
    case "socials":
      return GET_SOCIALS_SECTION
    default:
      return;
  }
};

export default function ({ sectionId, type, onFail }: SectionLifeCycleProps) {
  const [cookies] = useCookies(["userAuthToken"]);
  const [loadSection, { data, error }] = useLazyQuery(getQuery(type), {
    variables: {
      id: sectionId,
      token: cookies.userAuthToken,
    },
  });
  const section = useSelector(
    (state: RootState) => state.editorSlice.sections[sectionId]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(cacheSectionContent({ id: sectionId, value: data[type] }));
    }
    if (error) onFail(error);
  }, [data, error]);

  useEffect(() => {
    if (!section) loadSection();
    return () => {
      //Data Clean up
      const timeout = setTimeout(() => {
        dispatch(cacheClearSection(sectionId));
      }, 1800000);
    };
  }, []);
  return {
    refresh: loadSection,
    section: section,
  };
}
