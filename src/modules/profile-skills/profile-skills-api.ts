import { rtkQueryApi } from 'core/api/rtk-query-api'

import { type IGetDataSkills, type IUserSkills } from './profile-skills-types'

export const skillsApi = rtkQueryApi
  .enhanceEndpoints({ addTagTypes: ['skills'] })
  .injectEndpoints({
    endpoints: (builder) => ({

      getSkillsById: builder.query<IUserSkills, string>({
        query: (id) => ({
          url: `/skills-map/${id}`,
          method: 'GET'
        }),
        transformResponse: (result: IGetDataSkills) => result.data,

        providesTags: (result) =>
          result
            ? [
              ...Object.keys(result.junior).map((skill) => ({ type: 'skills' as const, id: skill })),
              ...Object.keys(result.middle).map((skill) => ({ type: 'skills' as const, id: skill })),
              ...Object.keys(result.senior).map((skill) => ({ type: 'skills' as const, id: skill })),
              { type: 'skills', id: 'list' }
            ]
            : [{ type: 'skills', id: 'list' }]
      }),

      updateSkillsById: builder.mutation<void, Record<string, boolean>>({
        query: (skills) => ({
          url: '/skills-map/me',
          method: 'PATCH',
          body: { skills }
        }),
        invalidatesTags: (result, error, body) => [{ type: 'skills', id: Object.keys(body)[0] }]
      })
    })
  })
