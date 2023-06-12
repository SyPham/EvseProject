import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class UtilitiesService {
    constructor(http) {
        this.http = http;
        this.UnflatteringForLeftMenu = (arr) => {
            const map = {};
            const roots = [];
            for (let i = 0; i < arr.length; i++) {
                const node = arr[i];
                node.children = [];
                map[node.id] = i; // use map to look-up the parents
                if (node.parentId !== null) {
                    delete node.children;
                    arr[map[node.parentId]].children.push(node);
                }
                else {
                    roots.push(node);
                }
            }
            return roots;
        };
        this.UnflatteringForTree = (arr) => {
            const map = {};
            const roots = [];
            let node = {
                data: {
                    id: '',
                    parentId: ''
                },
                expanded: true,
                children: []
            };
            for (let i = 0; i < arr.length; i += 1) {
                map[arr[i].id] = i; // initialize the map
                arr[i].data = arr[i]; // initialize the data
                arr[i].children = []; // initialize the children
            }
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < arr.length; i += 1) {
                node = arr[i];
                if (node.data.parentId !== null && arr[map[node.data.parentId]] !== undefined) {
                    arr[map[node.data.parentId]].children.push(node);
                }
                else {
                    roots.push(node);
                }
            }
            return roots;
        };
    }
    MakeSeoTitle(input) {
        if (input === undefined || input === '') {
            return '';
        }
        // Đổi chữ hoa thành chữ thường
        let slug = input.toLowerCase();
        // Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        // Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        // Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, '-');
        // Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        // Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        // Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        return slug;
    }
    ToFormData(formValue) {
        const formData = new FormData();
        for (const key of Object.keys(formValue)) {
            const value = formValue[key];
            let value2;
            if (value) {
                value2 = value;
                if (value2 instanceof Date) {
                    value2 = `${value2.toLocaleDateString()} ${value2.toLocaleTimeString('en-GB')}`;
                }
                formData.append(key, value);
            }
        }
        return formData;
    }
    checkExistHost(url) {
        const check = new RegExp("^(http|https)://", "i").test(url);
        return check;
    }
    checkValidImage(data) {
        const valid = new RegExp(".(?:jpg|gif|png)", "g").test(data);
        return valid;
    }
}
UtilitiesService.ɵprov = i0.ɵɵdefineInjectable({ factory: function UtilitiesService_Factory() { return new UtilitiesService(i0.ɵɵinject(i1.HttpClient)); }, token: UtilitiesService, providedIn: "root" });
UtilitiesService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
UtilitiesService.ctorParameters = () => [
    { type: HttpClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9waWdmYXJtLWNvcmUvc3JjL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBZSxNQUFNLHNCQUFzQixDQUFDOzs7QUFHL0QsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBRXBDLDRCQUF1QixHQUFHLENBQUMsR0FBVSxFQUFTLEVBQUU7WUFDOUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2YsTUFBTSxLQUFLLEdBQVUsRUFBRSxDQUFDO1lBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztnQkFDbkQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtvQkFDMUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNyQixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzdDO3FCQUFNO29CQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2xCO2FBQ0Y7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNm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QUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELGVBQWUsQ0FBQyxJQUFJO1FBQ2xCLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7WUF4R0YsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7O1lBRnpCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIFV0aWxpdGllc1NlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gIH1cclxuICBVbmZsYXR0ZXJpbmdGb3JMZWZ0TWVudSA9IChhcnI6IGFueVtdKTogYW55W10gPT4ge1xyXG4gICAgY29uc3QgbWFwID0ge307XHJcbiAgICBjb25zdCByb290czogYW55W10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSBhcnJbaV07XHJcbiAgICAgIG5vZGUuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgbWFwW25vZGUuaWRdID0gaTsgLy8gdXNlIG1hcCB0byBsb29rLXVwIHRoZSBwYXJlbnRzXHJcbiAgICAgIGlmIChub2RlLnBhcmVudElkICE9PSBudWxsKSB7XHJcbiAgICAgICAgZGVsZXRlIG5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgYXJyW21hcFtub2RlLnBhcmVudElkXV0uY2hpbGRyZW4ucHVzaChub2RlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByb290cy5wdXNoKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm9vdHM7XHJcbiAgfVxyXG5cclxuICBVbmZsYXR0ZXJpbmdGb3JUcmVlID0gKGFycjogYW55W10pOiBhbnlbXSA9PiB7XHJcbiAgICBjb25zdCBtYXAgPSB7fTtcclxuICAgIGNvbnN0IHJvb3RzOiBhbnlbXSA9IFtdO1xyXG4gICAgbGV0IG5vZGUgPSB7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgcGFyZW50SWQ6ICcnXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4cGFuZGVkOiB0cnVlLFxyXG4gICAgICBjaGlsZHJlbjogW11cclxuICAgIH07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICBtYXBbYXJyW2ldLmlkXSA9IGk7IC8vIGluaXRpYWxpemUgdGhlIG1hcFxyXG4gICAgICBhcnJbaV0uZGF0YSA9IGFycltpXTsgLy8gaW5pdGlhbGl6ZSB0aGUgZGF0YVxyXG4gICAgICBhcnJbaV0uY2hpbGRyZW4gPSBbXTsgLy8gaW5pdGlhbGl6ZSB0aGUgY2hpbGRyZW5cclxuICAgIH1cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItZm9yLW9mXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICBub2RlID0gYXJyW2ldO1xyXG4gICAgICBpZiAobm9kZS5kYXRhLnBhcmVudElkICE9PSBudWxsICYmIGFyclttYXBbbm9kZS5kYXRhLnBhcmVudElkXV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGFyclttYXBbbm9kZS5kYXRhLnBhcmVudElkXV0uY2hpbGRyZW4ucHVzaChub2RlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByb290cy5wdXNoKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm9vdHM7XHJcbiAgfVxyXG5cclxuICBNYWtlU2VvVGl0bGUoaW5wdXQ6IHN0cmluZykge1xyXG4gICAgaWYgKGlucHV0ID09PSB1bmRlZmluZWQgfHwgaW5wdXQgPT09ICcnKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIC8vIMSQ4buVaSBjaOG7ryBob2EgdGjDoG5oIGNo4buvIHRoxrDhu51uZ1xyXG4gICAgbGV0IHNsdWcgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIC8vIMSQ4buVaSBrw70gdOG7sSBjw7MgZOG6pXUgdGjDoG5oIGtow7RuZyBk4bqldVxyXG4gICAgc2x1ZyA9IHNsdWcucmVwbGFjZSgvw6F8w6B84bqjfOG6oXzDo3zEg3zhuq984bqxfOG6s3zhurV84bq3fMOifOG6pXzhuqd84bqpfOG6q3zhuq0vZ2ksICdhJyk7XHJcbiAgICBzbHVnID0gc2x1Zy5yZXBsYWNlKC/DqXzDqHzhurt84bq9fOG6uXzDqnzhur984buBfOG7g3zhu4V84buHL2dpLCAnZScpO1xyXG4gICAgc2x1ZyA9IHNsdWcucmVwbGFjZSgvaXzDrXzDrHzhu4l8xKl84buLL2dpLCAnaScpO1xyXG4gICAgc2x1ZyA9IHNsdWcucmVwbGFjZSgvw7N8w7J84buPfMO1fOG7jXzDtHzhu5F84buTfOG7lXzhu5d84buZfMahfOG7m3zhu5184buffOG7oXzhu6MvZ2ksICdvJyk7XHJcbiAgICBzbHVnID0gc2x1Zy5yZXBsYWNlKC/DunzDuXzhu6d8xal84bulfMawfOG7qXzhu6t84butfOG7r3zhu7EvZ2ksICd1Jyk7XHJcbiAgICBzbHVnID0gc2x1Zy5yZXBsYWNlKC/DvXzhu7N84bu3fOG7uXzhu7UvZ2ksICd5Jyk7XHJcbiAgICBzbHVnID0gc2x1Zy5yZXBsYWNlKC/EkS9naSwgJ2QnKTtcclxuICAgIC8vIFjDs2EgY8OhYyBrw70gdOG7sSDEkeG6t3QgYmnhu4d0XHJcbiAgICBzbHVnID0gc2x1Zy5yZXBsYWNlKC9cXGB8XFx+fFxcIXxcXEB8XFwjfFxcfHxcXCR8XFwlfFxcXnxcXCZ8XFwqfFxcKHxcXCl8XFwrfFxcPXxcXCx8XFwufFxcL3xcXD98XFw+fFxcPHxcXCd8XFxcInxcXDp8XFw7fF8vZ2ksICcnKTtcclxuICAgIC8vIMSQ4buVaSBraG/huqNuZyB0cuG6r25nIHRow6BuaCBrw70gdOG7sSBn4bqhY2ggbmdhbmdcclxuICAgIHNsdWcgPSBzbHVnLnJlcGxhY2UoLyAvZ2ksICctJyk7XHJcbiAgICAvLyDEkOG7lWkgbmhp4buBdSBrw70gdOG7sSBn4bqhY2ggbmdhbmcgbGnDqm4gdGnhur9wIHRow6BuaCAxIGvDvSB04buxIGfhuqFjaCBuZ2FuZ1xyXG4gICAgLy8gUGjDsm5nIHRyxrDhu51uZyBo4bujcCBuZ8aw4budaSBuaOG6rXAgdsOgbyBxdcOhIG5oaeG7gXUga8O9IHThu7EgdHLhuq9uZ1xyXG4gICAgc2x1ZyA9IHNsdWcucmVwbGFjZSgvXFwtXFwtXFwtXFwtXFwtL2dpLCAnLScpO1xyXG4gICAgc2x1ZyA9IHNsdWcucmVwbGFjZSgvXFwtXFwtXFwtXFwtL2dpLCAnLScpO1xyXG4gICAgc2x1ZyA9IHNsdWcucmVwbGFjZSgvXFwtXFwtXFwtL2dpLCAnLScpO1xyXG4gICAgc2x1ZyA9IHNsdWcucmVwbGFjZSgvXFwtXFwtL2dpLCAnLScpO1xyXG4gICAgLy8gWMOzYSBjw6FjIGvDvSB04buxIGfhuqFjaCBuZ2FuZyDhu58gxJHhuqd1IHbDoCBjdeG7kWlcclxuICAgIHNsdWcgPSAnQCcgKyBzbHVnICsgJ0AnO1xyXG4gICAgc2x1ZyA9IHNsdWcucmVwbGFjZSgvXFxAXFwtfFxcLVxcQHxcXEAvZ2ksICcnKTtcclxuXHJcbiAgICByZXR1cm4gc2x1ZztcclxuICB9XHJcblxyXG4gIFRvRm9ybURhdGEoZm9ybVZhbHVlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhmb3JtVmFsdWUpKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gZm9ybVZhbHVlW2tleV07XHJcbiAgICAgIGxldCB2YWx1ZTI7XHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIHZhbHVlMiA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh2YWx1ZTIgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICB2YWx1ZTIgPSBgJHsodmFsdWUyIGFzIERhdGUpLnRvTG9jYWxlRGF0ZVN0cmluZygpfSAkeyh2YWx1ZTIgYXMgRGF0ZSkudG9Mb2NhbGVUaW1lU3RyaW5nKCdlbi1HQicpfWBcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgdmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1EYXRhO1xyXG4gIH1cclxuICBjaGVja0V4aXN0SG9zdCh1cmwpIHtcclxuICAgIGNvbnN0IGNoZWNrID0gbmV3IFJlZ0V4cChcIl4oaHR0cHxodHRwcyk6Ly9cIiwgXCJpXCIpLnRlc3QodXJsKTtcclxuICAgIHJldHVybiBjaGVjaztcclxuICB9XHJcbiAgY2hlY2tWYWxpZEltYWdlKGRhdGEpIHtcclxuICAgIGNvbnN0IHZhbGlkID0gbmV3IFJlZ0V4cChcIi4oPzpqcGd8Z2lmfHBuZylcIiwgXCJnXCIpLnRlc3QoZGF0YSk7XHJcbiAgICByZXR1cm4gdmFsaWQ7XHJcbiAgfVxyXG59Il19