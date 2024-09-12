import { TextField } from "@mui/material"
import React, { useState } from "react"

interface TagInputFieldProps {
    onAddTag: (tag: string) => void
}

const TagInputField: React.FC<TagInputFieldProps> = ({ onAddTag }) => {
    const [inputValue, setInputValue] = useState<string>('')

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            event.preventDefault()
            onAddTag(inputValue.trim())
            setInputValue('')
        }
    }

    return (
        <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Añadir etiqueta"
            fullWidth
            variant="outlined"
        />
    )
}

export default TagInputField
