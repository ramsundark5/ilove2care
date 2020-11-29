import React from 'react'

import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks/use-store'
import { ProjectItem } from './ProjectItem'

export const ProjectList: React.FC = observer(() => {
    const { projectStore } = useStore()
    return (
        <>
            {projectStore.list.map((project) => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </>
    )
})
