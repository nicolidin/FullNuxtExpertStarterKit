import { useCookie, useRequestEvent } from '#app'
import { setCookie } from 'h3'

const COOKIE_NAME = 'lastVisitDate'

export default defineNuxtRouteMiddleware((to, from) => {
  const isServer = import.meta.server
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  const lastVisit = useCookie(COOKIE_NAME).value

  console.log('[firstVisit] ---')
  console.log('[firstVisit] côté:', isServer ? 'SERVER' : 'CLIENT')
  console.log('[firstVisit] vers:', to.path, '| depuis:', from.path)
  console.log('[firstVisit] today:', today, '| cookie lastVisit:', lastVisit ?? '(absent)')
  //
  // const pasEncoreVisiteAujourdhui = lastVisit !== today
  //
  // if (pasEncoreVisiteAujourdhui) {
  //   console.log('[firstVisit] → pas encore visité aujourd\'hui, on enregistre la visite et on redirige si pas sur /welcome')
  //
  //   if (isServer) {
  //     const event = useRequestEvent()
  //     if (event) {
  //       setCookie(event, COOKIE_NAME, today, { path: '/', maxAge: 60 * 60 * 24 })
  //       console.log('[firstVisit] → cookie posé (setCookie h3)')
  //     }
  //   } else {
  //     useCookie(COOKIE_NAME).value = today
  //     console.log('[firstVisit] → cookie posé (useCookie)')
  //   }
  //
  //   if (to.path !== '/welcome') {
  //     console.log('[firstVisit] → REDIRECT /welcome')
  //     return navigateTo('/welcome')
  //   }
  //   console.log('[firstVisit] → déjà sur /welcome, on laisse')
  // } else {
  //   console.log('[firstVisit] → déjà visité aujourd\'hui, on laisse passer')
  // }
})
