import React from 'react'
import { Link } from 'react-router-dom'
import { TagCard } from './components/tag-card'
import useSWR from 'swr'
import { getSummaryWithTags } from '../../services/tag'
import { AddButton } from './components/add-button'

interface Props { }
export const HomePage: React.FC<Props> = () => {
  const { data, error, isLoading } = useSWR('getSummaryWithTags', () => getSummaryWithTags('2024-06'))
  if (error) return <div>failed to load</div>
  return (
    <div className="h-full flex flex-col items-center">
      <div className='h-8'>这可能是一个记账软件？</div>
      {isLoading && 'loading...'}
      {!data?.data.resources ? <div>暂无记录，去<Link className='text-blue-500' to='/tags/new'>创建标签</Link></div>
        :
        <div className="grid grid-cols-3 gap-2">
          {data?.data.resources.map(tag => (
            <TagCard {...tag} key={tag.id} />
          ))}
        </div>
      }
      <AddButton />

    </div>
  )
}
