import { Box, Button, Divider, TextField } from "@mui/material";
import { FC, useState, useContext } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setTouched(false);
    setIsAddingEntry(false);
    setInputValue("");
  };

  return (
    <Box sx={{ mb: 2, py: 2, px: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            placeholder="Nueva entrada"
            fullWidth
            autoFocus
            multiline
            label="Nueva entrada"
            helperText="Escribe aquí tu nueva entrada"
            color="secondary"
            error={touched && inputValue.length <= 0}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setTouched(true)}
          />

          <Box display="flex" justifyContent="space-between" py={2}>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsAddingEntry(false)}
            >
              Cancelar
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Button
            startIcon={<AddCircleOutlinedIcon />}
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ height: "100%" }}
            onClick={() => setIsAddingEntry(true)}
          >
            Agregar Tarea
          </Button>
        </>
      )}
    </Box>
  );
};
