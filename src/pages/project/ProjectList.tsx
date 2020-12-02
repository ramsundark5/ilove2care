import React from 'react'

import { observer } from 'mobx-react-lite'

import { useStore } from '../../hooks/use-store'
import { ProjectItem } from './ProjectItem'

const ProjectList: React.FC = () => {
    const { projectStore } = useStore()
    return (
        <>
            {projectStore.list.map((project) => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </>
    )
}
export default observer(ProjectList)
