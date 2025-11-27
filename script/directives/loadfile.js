/**
 * @license
 * Copyright Dan Munro
 * Released under Expat license <https://directory.fsf.org/wiki/License:Expat>
 */

'use strict';

/**
 * @ngdoc directive
 * @name pbnApp.directive:loadFile
 * @description
 * # loadFile
 */
angular.module('pbnApp')
	.directive('loadFile', function () {
		return {
			restrict: 'A',
			scope: {
				imageLoaded: '&'
			},
			link: function (scope, elem, attr) {
				elem = elem[0];
				elem.ondragover = function () {
					elem.style.border = "4px dashed black";

					return false;
				};
				elem.ondragleave = function () {
					elem.style.border = "4px dashed #777777";

					return false;
				};
				elem.ondrop = function (e) {
					e.preventDefault();
					console.log("LoadFile: 检测到文件拖入"); // 调试

					var file = e.dataTransfer.files[0];
					var reader = new FileReader();
					reader.onload = function (event) { // 建议用 onload 而不是 onloadend
						console.log("LoadFile: FileReader 读取完成"); // 调试
						scope.$apply(function () {
							// 在 apply 内部调用，确保 angular 知道状态变化
							scope.imageLoaded({ img: event.target.result });
						});
					};
					reader.readAsDataURL(file);
					elem.style.border = "4px dashed gray";
					return false;
				};

				var fileInput = document.getElementById('fileBrowser');
				// 增加判空，防止还没渲染出来导致报错（虽然你说没报错，加个保险）
				if (fileInput) {
					fileInput.addEventListener('change', function (e) {
						console.log("LoadFile: 检测到文件选择"); // 调试
						var file = fileInput.files[0];
						if (file && file.type.match(/image.*/)) {
							var reader = new FileReader();
							reader.onload = function (event) {
								console.log("LoadFile: FileReader 读取完成"); // 调试
								scope.$apply(function () {
									scope.imageLoaded({ img: event.target.result });
								});
							};
							reader.readAsDataURL(file);
						} else {
							alert("wrong file format or no file selected");
						}
					});
				} else {
					console.error("LoadFile Error: 找不到 ID 为 fileBrowser 的 input 元素");
				}
			}
		}
	});
