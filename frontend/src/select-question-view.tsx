import React from 'react';
import {
  SELECT_QUESTION_VIEW_TYPE,
  OWNER_SELECT_QUESTION_VIEW_TYPE,
} from 'shared/src';

import { Socket, SetState } from './types';

export const SelectQuestionView = ({
  io,
  state,
  setState,
}: {
  io: Socket;
  state: SELECT_QUESTION_VIEW_TYPE | OWNER_SELECT_QUESTION_VIEW_TYPE;
  setState: SetState;
}) => {
  return (
    <div>
      <div>{state.round.name}</div>
      <table>
        <tbody>
          {state.round.themes.map((theme, index) => (
            <tr key={index}>
              <td>{theme.name}</td>
              {theme.questions.map((question, index) => (
                <td
                  key={index}
                  onClick={() => {
                    if (state.type === 'OWNER_SELECT_QUESTION_VIEW') {
                      return;
                    }

                    io.emit(
                      'SELECT_QUESTION',
                      {
                        id: question.id,
                      },
                      (state) => {
                        setState(state);
                      }
                    );
                  }}
                >
                  {question ? question.price : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
