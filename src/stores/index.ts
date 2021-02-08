/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createContext } from 'react';
import { types, Instance } from 'mobx-state-tree';
import { IVonage } from 'src/types/vonage';
import { ArgumentTypes } from 'src/helper/utilTypes';
import OT from '@opentok/client';

const RootStore = types
  .model({})
  .volatile(
    (self): IVonage => {
      return {
        session: null,
        publisher: null,
        subscriber: null,
      };
    },
  )
  .actions((self) => {
    /**
     * Vonage Video API 에러 핸들러
     */
    function handleError(error?: OT.OTError) {
      if (error) {
        console.log(error);
        alert(error.message);
      }
    }

    /**
     * 미리 생성된 세션의 정보와 메소드들을 포함하는 객체를 생성한다
     * @param apiKey Vonage API KEY
     * @param sessionId 생성된 Session ID
     */
    function initSession(apiKey: string, sessionId: string) {
      const _session = OT.initSession(apiKey, sessionId);
      self.session = _session;
    }

    /**
     * 퍼블리셔 객체를 생성한다
     * @param targetElement 퍼블리셔 객체가 붙을 DOM 노드
     * @param properties 추가 설정
     * @param callback 에러 핸들러
     */
    function initPublisher(...args: ArgumentTypes<typeof OT.initPublisher>) {
      // publisher 객체 생성
      const _publisher = OT.initPublisher(...args);
      self.publisher = _publisher;
    }

    /**
     * 주어진 파라미터를 바탕으로 스트림을 subscribe 한다
     * @param stream 스트림 객체
     * @param targetElement subscriber 가 붙을 DOM 노드
     * @param properties 추가 설정
     * @param callback 에러 핸들러
     */
    // @ts-ignore
    function subscribe(...args: ArgumentTypes<typeof self.session.subscribe>) {
      if (!self.session) {
        return;
      }
      const _subscriber = self.session.subscribe(...args);
      self.subscriber = _subscriber;
    }

    return {
      handleError,
      initSession,
      initPublisher,
      subscribe,
    };
  });

export const rootStore = RootStore.create({});

export type IRootStore = Instance<typeof RootStore>;

export const RootStoreContext = createContext<null | IRootStore>(null);
