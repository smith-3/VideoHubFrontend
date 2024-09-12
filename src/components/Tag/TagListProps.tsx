import { Chip, Box } from "@mui/material"
import React from "react"

interface TagListProps {
    tags: string[]
    onDeleteTag: (tag: string) => void
}

const TagList: React.FC<TagListProps> = ({ tags, onDeleteTag }) => {
    return (
        <Box sx={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map((tag, index) => (
                <Chip key={index} label={tag} onDelete={() => onDeleteTag(tag)} />
            ))}
        </Box>
    )
}

export default TagList
