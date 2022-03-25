import { api } from 'src/boot/axios';
import { DataBase } from 'src/types';
import { InjectionKey } from 'vue';
export interface IComment extends DataBase {
  email: string;
  name: string;
  message: string;
  visible: boolean;
}
/**
 * @class CommentInjectable
 */
class CommentInjectable {
  /**
   * create
   * @param comment
   * @returns
   */
  async create(comment: IComment) {
    return api.post<IComment>('comments', comment);
  }
  /**
   * list
   * @returns
   */
  async list() {
    return api.get<IComment[]>('comments');
  }
  /**
   * remove
   * @param commentId
   * @param comment
   * @returns
   */
  async remove(commentId: number) {
    return api.delete<void>(`comments/${commentId}`);
  }
  /**
   * update
   * @param comment
   * @returns
   */
  async update(comment: IComment) {
    return api.patch<IComment>(`comments/${Number(comment.id)}`, comment);
  }
}

export const $commentInjectable = new CommentInjectable();
export const _comment: InjectionKey<CommentInjectable> =
  Symbol('CommentInjectable');
