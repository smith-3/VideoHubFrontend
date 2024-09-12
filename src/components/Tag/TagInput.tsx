import React, { useState } from "react"
import TagInputField from "./TagInputField"
import TagList from "./TagListProps"

interface TagInputProps {
    tags: string[]
    setTags: (newTags: string[]) => void
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
    const handleAddTag = (tag: string) => {
        setTags([...tags, tag])
    }

    const handleDeleteTag = (tagToDelete: string) => {
        setTags(tags.filter(tag => tag !== tagToDelete))
    }

    return (
        <div>
            <TagInputField onAddTag={handleAddTag} />
            <TagList tags={tags} onDeleteTag={handleDeleteTag} />
        </div>
    )
}

export default TagInput
