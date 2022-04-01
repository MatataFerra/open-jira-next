import { FC, useEffect, useReducer } from "react";
import { Entry } from "../../interface";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] - Add Entry", payload: data });
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnack: boolean = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry] - Update Entry", payload: data });

      if (showSnack) {
        enqueueSnackbar("Entry updated successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });

        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntry = async (entry: Entry) => {
    try {
      await entriesApi.delete(`/entries/${entry._id}`);
      dispatch({ type: "[Entry] - Delete Entry", payload: entry });

      enqueueSnackbar("Entry deleted successfully", {
        variant: "info",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<Entry[]>("/entries");
      dispatch({ type: "[Entry] - Refresh Entry", payload: data });
    } catch (error) {
      console.log(error);
      return console.log("Ha ocurrido un error, revise la consola");
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
