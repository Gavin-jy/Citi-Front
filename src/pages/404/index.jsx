import React from "react";

export default function _404() {
  return (
    <div class="box">
      <div class="box__ghost">
        <div class="symbol"></div>
        <div class="symbol"></div>
        <div class="symbol"></div>
        <div class="symbol"></div>
        <div class="symbol"></div>
        <div class="symbol"></div>

        <div class="box__ghost-container">
          <div class="box__ghost-eyes">
            <div class="box__eye-left"></div>
            <div class="box__eye-right"></div>
          </div>
          <div class="box__ghost-bottom">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="box__ghost-shadow"></div>
      </div>

      <div class="box__description">
        <div class="box__description-container">
          <div class="box__description-title">404错误！</div>
          <div class="box__description-text">看来我们找不到你要找的那一页</div>
        </div>

        <a href="https://www.qian.blue" class="box__button">
          返回
        </a>
      </div>
    </div>
  );
}
