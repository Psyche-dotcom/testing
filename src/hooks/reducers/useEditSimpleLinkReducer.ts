import { useReducer, Reducer } from "react"

type SimpleLinkType = {

}

const EditSimpleLinkReducer = (state: SimpleLinkType, action: { value: string, type: string }) => {
    switch (action.type) {

    }
}

export const useEditSimpleLink = (init) => {
    return useReducer<any>(EditSimpleLinkReducer, init);
}